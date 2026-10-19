import { lazy, Suspense, useEffect, useRef, useState } from "react";

const Lumi3D = lazy(() =>
  import("./Lumi3D").then((module) => ({
    default: module.Lumi3D,
  })),
);
type Reaction = "love" | "happy" | "surprised" | "sad" | "sleepy";
type SoundKind = Reaction;

export function LumiMascot() {
  const [touched, setTouched] = useState(false);
  const [reaction, setReaction] = useState<Reaction>("love");
  const [showReaction, setShowReaction] = useState(false);
  const [muted, setMuted] = useState(false);

  const tapTimes = useRef<number[]>([]);
  const reactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      if (reactionTimer.current) clearTimeout(reactionTimer.current);
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
      void audioContext.current?.close();
      audioContext.current = null;
    };
  }, []);

  async function playSound(kind: SoundKind) {
    if (muted || typeof window === "undefined") return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }).webkitAudioContext;

      if (!AudioContextClass) return;

      let context = audioContext.current;

      if (!context || context.state === "closed") {
        context = new AudioContextClass();
        audioContext.current = context;
      }

      if (context.state !== "running") {
        await context.resume();
      }

      if (context.state !== "running") return;

      const settings: Record<
        SoundKind,
        { start: number; end: number; duration: number; volume: number }
      > = {
        love: { start: 660, end: 880, duration: 0.48, volume: 0.3 },
        happy: { start: 600, end: 1200, duration: 0.32, volume: 0.32 },
        surprised: { start: 380, end: 1000, duration: 0.4, volume: 0.34 },
        sad: { start: 520, end: 280, duration: 0.65, volume: 0.24 },
        sleepy: { start: 420, end: 240, duration: 0.85, volume: 0.2 },
      };

      const sound = settings[kind];
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = kind === "surprised" ? "triangle" : "sine";

      oscillator.frequency.setValueAtTime(sound.start, now);
      oscillator.frequency.exponentialRampToValueAtTime(
        sound.end,
        now + sound.duration
      );

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(sound.volume, now + 0.035);
      gain.gain.setValueAtTime(
        sound.volume,
        now + sound.duration * 0.45
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + sound.duration
      );

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start(now);
      oscillator.stop(now + sound.duration + 0.02);

      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
      };
    } catch (error) {
      console.warn("Lumi's sound could not play:", error);
    }
  }

  function showEmotion(nextReaction: Reaction) {
    setTouched(true);
    setReaction(nextReaction);
    setShowReaction(true);
    void playSound(nextReaction);

    if (reactionTimer.current) clearTimeout(reactionTimer.current);

    reactionTimer.current = setTimeout(() => {
      setShowReaction(false);
    }, 2400);
  }

  function handleLumiTap() {
    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }

    const now = Date.now();
    const recentTaps = [...tapTimes.current, now].filter(
      (time) => now - time < 1800
    );

    tapTimes.current = recentTaps;

    if (recentTaps.length >= 3) {
      showEmotion("surprised");
      tapTimes.current = [];
    } else if (recentTaps.length === 2) {
      showEmotion("happy");
    } else {
      showEmotion("love");
    }
  }

  function handlePointerDown() {
    isLongPress.current = false;

    if (longPressTimer.current) clearTimeout(longPressTimer.current);

    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      tapTimes.current = [];
      showEmotion("sleepy");
    }, 900);
  }

  function handlePointerEnd() {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }

  return (
    <div className="fixed bottom-5 right-4 z-[100] sm:bottom-8 sm:right-8">
      <style>{`
        @keyframes lumi-float {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-14px) rotate(4deg); }
        }

        @keyframes lumi-twinkle {
          0%, 100% { opacity: .4; transform: scale(.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes lumi-blink {
          0%, 45%, 49%, 100% { transform: scaleY(1); }
          47% { transform: scaleY(.12); }
        }

        @keyframes lumi-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          35% { transform: translateY(-12px) scale(1.05); }
          65% { transform: translateY(2px) scale(.98); }
        }

        @keyframes lumi-reaction-in {
          from { opacity: 0; transform: translateY(8px) scale(.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .lumi-float {
          animation: lumi-float 3s ease-in-out infinite;
        }

        .lumi-twinkle {
          animation: lumi-twinkle 1.8s ease-in-out infinite;
        }

        .lumi-blink {
          animation: lumi-blink 4s infinite;
          transform-origin: center;
        }

        .lumi-bounce {
          animation: lumi-bounce .45s ease-in-out;
        }

        .lumi-reaction {
          animation: lumi-reaction-in .2s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .lumi-float, .lumi-twinkle, .lumi-blink,
          .lumi-bounce, .lumi-reaction {
            animation: none !important;
          }
        }
      `}</style>

      {/* Reaction bubble */}
      {showReaction && (
        <div
          key={reaction}
          role="status"
          aria-live="polite"
          className="lumi-reaction absolute bottom-full right-0 mb-3 w-56 rounded-2xl border border-pink-200 bg-white px-4 py-3 text-sm font-semibold leading-relaxed text-purple-800 shadow-lg dark:border-purple-700 dark:bg-slate-900 dark:text-purple-100"
        >
          {reaction === "surprised"
            ? "Heyyy! Be gentle with me, please! 🥺"
            : reaction === "happy"
              ? "Yayyy! You're making me sparkle! ✨"
              : reaction === "sad"
                ? "A little hug would make me feel better. 💗"
                : reaction === "sleepy"
                  ? "Mmmm... let's have a dreamy little rest. 🌙"
                  : "Hmmmmm… happy to see you, dreamer! 💗"}

          <span
            aria-hidden="true"
            className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-pink-200 bg-white dark:border-purple-700 dark:bg-slate-900"
          />
        </div>
      )}

      {/* Sound control */}
      <button
        type="button"
        onClick={() => setMuted((current) => !current)}
        aria-label={muted ? "Turn Lumi sounds on" : "Mute Lumi sounds"}
        aria-pressed={muted}
        className="absolute -left-2 top-0 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-purple-200 bg-white text-lg shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 dark:border-purple-700 dark:bg-slate-900"
      >
        {muted ? "🔇" : "🔊"}
      </button>

      
      {/* Lumi mascot */}
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerEnd}
        onPointerLeave={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onClick={handleLumiTap}
        aria-label="Tap Lumi to interact, or hold for a sleepy reaction"
        className="relative rounded-full p-2 outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-pink-300"
      >
        {/* Interactive 3D Lumi */}
        <div
          className={`lumi-float relative h-32 w-32 sm:h-36 sm:w-36 ${
            showReaction && reaction === "surprised" ? "lumi-bounce" : ""
          }`}
        >
          <Suspense
  fallback={
    <div
      className="h-full w-full rounded-full bg-purple-100/60"
      role="status"
      aria-label="Loading Lumi"
    />
  }
>
  <Lumi3D expression={showReaction ? reaction : "love"} />
</Suspense>

          {/* Princess crown */}
          <span className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -rotate-6 text-3xl drop-shadow-md">
            👑
          </span>

          {/* Sparkles */}
          <span className="lumi-twinkle pointer-events-none absolute right-0 top-2 text-xl">
            ✨
          </span>
          <span className="lumi-twinkle pointer-events-none absolute -left-1 top-8 text-lg">
            ⭐
          </span>
          <span className="lumi-twinkle pointer-events-none absolute bottom-3 -right-1 text-lg">
            💫
          </span>

          {/* Name */}
          <span className="pointer-events-none absolute bottom-[-10px] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-purple-600 shadow-md dark:bg-slate-900/95 dark:text-purple-200">
            {showReaction && reaction === "surprised"
              ? "Eep! 🥺"
              : showReaction && reaction === "happy"
                ? "Yay! ✨"
                : showReaction && reaction === "sleepy"
                  ? "Zzz... 🌙"
                  : touched
                    ? "Love you, dreamer! 💗"
                    : "Lumi ✨"}
          </span>
        </div>
      </button>
    </div>
  );
}

