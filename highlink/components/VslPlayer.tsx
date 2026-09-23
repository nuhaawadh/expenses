"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content";
import { site } from "@/lib/site";
import { displayProgress, secondsWatched } from "@/lib/useBookingUnlock";
import { MutedIcon, PauseIcon, PlayIcon, RestartIcon, RetryIcon, SpeakerIcon } from "./icons";

type Props = {
  t: Content["video"];
  onProgress: (p: number) => void;
  onUnlock: () => void;
};

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "00:00";
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

/**
 * Sales-video player. Autoplays muted behind a "click to unmute" card;
 * the first click restarts the video with sound. Reports eased progress and
 * unlocks booking once enough of the video has actually been watched.
 */
export function VslPlayer({ t, onProgress, onUnlock }: Props) {
  const hasVideo = Boolean(site.video.src);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black" data-vsl-player>
      {hasVideo ? <VideoPlayer t={t} onProgress={onProgress} onUnlock={onUnlock} /> : <Placeholder t={t} />}
    </div>
  );
}

/** Card shown over the frame: same shape for "click to unmute" and the placeholder. */
function Veil({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute inset-x-[16%] inset-y-[10%] flex flex-col items-center justify-center gap-3 rounded-md border-2 border-white/90 bg-veil px-4 text-center text-white shadow-2xl sm:gap-4">
      {children}
    </span>
  );
}

function Placeholder({ t }: { t: Content["video"] }) {
  return (
    <div role="img" aria-label={t.label} className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_50%,#0d2a6b,#000)]">
      <Veil>
        <SpeakerIcon className="h-8 w-8 sm:h-14 sm:w-14" />
        <span className="text-base font-bold leading-snug sm:text-[28px]">{t.placeholder}</span>
        <span className="text-xs text-white/85 sm:text-base">{t.placeholderNote}</span>
      </Veil>
    </div>
  );
}

function VideoPlayer({ t, onProgress, onUnlock }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  const [unmuted, setUnmuted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);

  // Progress + unlock polling, plus a watchdog that shows the retry state
  // if the video has not become playable for 15 seconds.
  useEffect(() => {
    setFailed(false);
    let lastHealthy = Date.now();
    const id = window.setInterval(() => {
      const v = ref.current;
      if (!v) return;
      onProgress(displayProgress(v.currentTime, v.duration, v.ended));
      setTime(v.currentTime);
      if (v.ended || secondsWatched(v) >= site.unlockAfterSeconds) onUnlock();
      if (v.readyState >= 2 && !v.error) lastHealthy = Date.now();
      else if (Date.now() - lastHealthy > 15000) setFailed(true);
    }, 250);
    return () => window.clearInterval(id);
  }, [attempt, onProgress, onUnlock]);

  const startWithSound = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    setMuted(false);
    setUnmuted(true);
    void v.play();
  };
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  return (
    <>
      <video
        key={attempt}
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={site.video.src}
        poster={site.video.poster || undefined}
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onError={() => setFailed(true)}
        onClick={unmuted ? toggle : undefined}
      />

      {!unmuted && !failed && (
        <button type="button" onClick={startWithSound} className="absolute inset-0 z-10 cursor-pointer" aria-label={t.unmute}>
          <Veil>
            <SpeakerIcon className="h-8 w-8 sm:h-14 sm:w-14" />
            <span className="text-base font-bold leading-snug sm:text-[28px]">
              {t.playing}
              <br />
              {t.unmute}
            </span>
          </Veil>
        </button>
      )}

      {unmuted && !failed && (
        <div
          dir="ltr"
          className={`absolute inset-x-0 bottom-0 z-10 flex items-center gap-1 bg-progress/80 px-2 text-white transition-opacity duration-300 ${
            playing ? "opacity-0 hover:opacity-100 focus-within:opacity-100" : "opacity-100"
          }`}
        >
          <button type="button" onClick={toggle} aria-label={playing ? t.pause : t.play} className="grid h-10 w-10 place-items-center">
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            onClick={() => ref.current && (ref.current.currentTime = 0)}
            aria-label={t.restart}
            className="grid h-10 w-10 place-items-center"
          >
            <RestartIcon />
          </button>
          <button
            type="button"
            onClick={() => ref.current && (ref.current.muted = !ref.current.muted)}
            aria-label={muted ? t.sound : t.mute}
            className="grid h-10 w-10 place-items-center"
          >
            {muted ? <MutedIcon /> : <SpeakerIcon size={20} />}
          </button>
          <span className="ms-1 font-mono text-xs tabular-nums">{fmt(time)}</span>
        </div>
      )}

      <AnimatePresence>
        {failed && (
          <motion.div
            role="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-white px-6 text-black"
          >
            <p>{t.error}</p>
            <button
              type="button"
              onClick={() => setAttempt((a) => a + 1)}
              className="inline-flex items-center gap-2 rounded-md bg-black px-5 py-3 text-sm font-medium text-white"
            >
              <RetryIcon size={16} />
              {t.retry}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
