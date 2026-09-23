/**
 * Fixed page atmosphere: film grain + two slow teal/steel light fields.
 * Pure CSS so it costs nothing on the main thread.
 */
export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="animate-drift-a absolute -top-[30%] left-[10%] h-[80vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgba(95,212,180,0.075),transparent)] blur-2xl" />
      <div className="animate-drift-b absolute top-[35%] -right-[20%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(120,150,170,0.06),transparent)] blur-2xl" />
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
