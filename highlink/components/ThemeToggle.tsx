"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

export const THEME_KEY = "highlink-theme";

/** Runs before paint (inlined in <head>) so the saved theme never flashes. */
export const themeInitScript = `try{if(localStorage.getItem("${THEME_KEY}")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export function ThemeToggle({ label }: { label: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-fg"
    >
      {dark ? <MoonIcon /> : <SunIcon />}
      <span className="sr-only">{label}</span>
    </button>
  );
}
