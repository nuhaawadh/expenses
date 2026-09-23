"use client";

import { useEffect, useRef } from "react";

/**
 * Full-screen animated wave field (WebGL). Horizontal colour bands drift
 * slowly, bend with value noise, ripple around the cursor, and get a film
 * grain and soft vignette. Colours come from the active theme.
 */

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uT;
uniform vec3 uMouse;
uniform vec3 c0;uniform vec3 c1;uniform vec3 c2;uniform vec3 c3;

float h(vec2 p){p=fract(p*vec2(127.1,311.7));p+=dot(p,p+19.19);return fract(p.x*p.y);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float grain(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float field(vec2 p){float v=0.,a=.55;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.1+vec2(3.7,1.9);a*=.5;}return v;}

vec3 ramp(float x){
  x=clamp(x,0.,1.)*3.;
  vec3 c=mix(c0,c1,smoothstep(0.,1.,x));
  c=mix(c,c2,smoothstep(1.,2.,x));
  return mix(c,c3,smoothstep(2.,3.,x));
}

void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  float s=min(uRes.x,uRes.y);
  vec2 p=(gl_FragCoord.xy-.5*uRes)/s;

  vec2 m=(uMouse.xy-.5)*uRes/s;
  float d=length(p-m);
  float ring=sin(d*28.-uT*3.5)*(1.-smoothstep(0.,.42,d))*uMouse.z*.03;
  uv+=normalize(p-m+.0001)*ring*s/uRes;

  float t=uT*.06;
  float warp=field(p*1.6+vec2(t,-t*.7));
  float band=uv.y
    +sin(uv.x*6.3+uT*.55+warp*2.)*.07
    +sin(uv.x*2.1-uT*.3)*.05
    +(warp-.5)*.30;

  vec3 col=ramp(band);
  col*=1.-.22*smoothstep(.4,1.,length(uv-.5)*1.35);
  col+=(grain(gl_FragCoord.xy)-.5)*.07;
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}`;

type Palette = [string, string, string, string];

/** Bottom → top colour stops per theme. */
const PALETTES: Record<"dark" | "light", Palette> = {
  // Near-black top (headline) through a deep teal band to an ink-teal floor.
  dark: ["#020606", "#08342f", "#136358", "#070b0c"],
  // Reference-style light field: pale top, saturated middle, deep bottom.
  light: ["#021a18", "#0d6b5e", "#4fcdb8", "#eefbf8"],
};

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16) / 255) as [number, number, number];

export function WaveBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false });
    if (!gl) return; // CSS gradient on the wrapper remains as fallback

    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = shader(gl.VERTEX_SHADER, VERT);
    const fs = shader(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u("uRes"), uT = u("uT"), uMouse = u("uMouse");
    const stops = [u("c0"), u("c1"), u("c2"), u("c3")];

    const applyTheme = () => {
      const light = document.documentElement.classList.contains("light");
      PALETTES[light ? "light" : "dark"].forEach((c, i) => gl.uniform3f(stops[i], ...hex(c)));
      kick();
    };

    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0, visible = true, last = 0, time = 0;
    // Pointer target and smoothed position (0..1, y up), plus ripple strength.
    let tx = 0.5, ty = 0.5, mx = 0.5, my = 0.5, target = 0, strength = 0;

    const frame = (now: number) => {
      raf = 0;
      if (document.hidden || !visible) {
        last = 0;
        return;
      }
      const r = canvas.getBoundingClientRect();
      // Cap the pixel budget (~2MP) so large or high-DPI screens stay smooth.
      const dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(2e6 / Math.max(1, r.width * r.height)));
      const w = Math.max(1, Math.round(r.width * dpr)), hgt = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== hgt) {
        canvas.width = w;
        canvas.height = hgt;
      }
      gl.viewport(0, 0, w, hgt);

      const dt = last ? Math.min(now - last, 100) : 16;
      last = now;
      if (!reduce.matches) time += dt / 1000;
      const k = 1 - Math.exp(-dt / 90);
      mx += (tx - mx) * k;
      my += (ty - my) * k;
      strength += (target - strength) * k;

      gl.uniform2f(uRes, w, hgt);
      gl.uniform1f(uT, time);
      gl.uniform3f(uMouse, mx, my, reduce.matches ? 0 : strength);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce.matches) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduce.matches) return;
      tx = e.clientX / window.innerWidth;
      ty = 1 - e.clientY / window.innerHeight;
      if (target === 0 && strength < 0.01) {
        mx = tx;
        my = ty;
      }
      target = 1;
      kick();
    };
    const onLeave = () => (target = 0);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      kick();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(kick);
    ro.observe(canvas);
    const mo = new MutationObserver(applyTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    document.addEventListener("visibilitychange", kick);
    reduce.addEventListener("change", kick);
    applyTheme();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", kick);
      reduce.removeEventListener("change", kick);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <div aria-hidden className="wave-fallback fixed inset-0 z-0">
      <canvas ref={ref} className="block h-full w-full" />
    </div>
  );
}
