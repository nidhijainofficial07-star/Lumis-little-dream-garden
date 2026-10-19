
import { useEffect, useRef, useState } from "react";
import { LumiCharacter } from "./LumiCharacter";
import { sounds } from "@/lib/sound";

const confetti = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  return {
    dx: Math.cos(a) * 140,
    dy: Math.sin(a) * 120,
    c: ["✦", "★", "♡", "✿"][i % 4],
  };
});

const dreamSparkles = Array.from({ length: 8 }, (_, i) => ({
  left: `${8 + ((i * 37) % 84)}%`,
  top: `${8 + ((i * 29) % 78)}%`,
  delay: `${i * 0.55}s`,
  symbol: i % 3 === 0 ? "✦" : i % 3 === 1 ? "✧" : "·",
}));

const lumiMessages = [
  "Hehe! That tickles! ☁️",
  "Did you bring me a dream? 💗",
  "Boing boing! ✨",
  "You're my favourite dreamer! 🌙",
  "Psst... you're made of stardust! ⭐",
  "Let's make a little wish! 🌷",
  "Sending you a cloud hug! 🤍",
  "Wheee! Let's fly together! 🪽",
];

export function InteractiveLumi() {
  const wrap = useRef<HTMLDivElement>(null);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [react, setReact] = useState<"" | "lumi-boing" | "lumi-spin">("");
  const [taps, setTaps] = useState(0);
  const [secret, setSecret] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const r = wrap.current?.getBoundingClientRect();
        if (!r) return;

        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;

        setPos({
          x: Math.max(-24, Math.min(24, dx / 25)),
          y: Math.max(-16, Math.min(16, dy / 30)),
        });

        const k = Math.min(1, d / 300);
        setEye({
          x: (dx / d) * 4 * k,
          y: (dy / d) * 3 * k,
        });
      });
    };

    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!message) return;

    const timer = window.setTimeout(() => setMessage(""), 2800);
    return () => window.clearTimeout(timer);
  }, [message]);

  const poke = () => {
    setReact("");
    requestAnimationFrame(() => setReact("lumi-boing"));

    const randomMessage =
  lumiMessages[Math.floor(Math.random() * lumiMessages.length)] ??
  "Sending you a cloud hug! 🤍";

setMessage(randomMessage);
    sounds.tap();
  };

  
  const jarPoke = () => {
    setReact("");
    requestAnimationFrame(() => setReact("lumi-boing"));
    setMessage("A little dream, just for you! 🫙✨");
    sounds.sparkle();
  };


  const antenna = () => {
    const n = taps + 1;

    if (n >= 5) {
      setTaps(0);
      setSecret((s) => s + 1);
      setReact("lumi-spin");
      setMessage("You found my secret wish star! ⭐");
      sounds.secret();
    } else {
      setTaps(n);
      setMessage(
        n >= 3
          ? `Almost there! ${5 - n} more little taps! ✨`
          : "Ooh, my little star! Tap it again! ⭐",
      );
      sounds.sparkle();
    }
  };

  return (
    <div ref={wrap} className="relative">
      <div className="lumi-dream-sparkles" aria-hidden="true">
        {dreamSparkles.map((sparkle, i) => (
          <span
            key={`dream-sparkle-${i}`}
            className="lumi-dream-sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDelay: sparkle.delay,
            }}
          >
            {sparkle.symbol}
          </span>
        ))}
      </div>

      {message && (
        <div
          key={message}
          role="status"
          className="absolute -top-12 left-1/2 z-20 w-max max-w-[240px] -translate-x-1/2 rounded-2xl border border-white/70 bg-white/95 px-4 py-2 text-center font-hand text-lg text-violet-700 shadow-lg"
        >
          {message}
          <span
            aria-hidden="true"
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-white"
          >
            ♥
          </span>
        </div>
      )}

      <div
        className="lumi-follow lumi-arrive"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
        }}
      >
        <div className="anim-float lumi-breathe">
          <div
            className={react}
            onAnimationEnd={() => setReact("")}
            style={{
              transform: react
                ? undefined
                : `rotate(${pos.x * 0.12}deg)`,
              transition: "transform 0.35s ease-out",
              transformOrigin: "50% 65%",
            }}
          >
            
<LumiCharacter
  className="night-glow relative w-full"
  eye={eye}
  onBodyClick={poke}
  onAntennaClick={antenna}
  onJarClick={jarPoke}
  antennaGlow={taps}
/>

          </div>
        </div>
      </div>

      {secret > 0 && (
        <div key={secret} aria-hidden="true">
          {confetti.map((c, i) => (
            <span
              key={`${secret}-${i}`}
              className="lumi-confetti text-2xl text-butter"
              style={{
                ["--dx" as string]: `${c.dx}px`,
                ["--dy" as string]: `${c.dy}px`,
                animationDelay: `${i * 0.03}s`,
              }}
            >
              {c.c}
            </span>
          ))}
        </div>
      )}

      <div aria-live="polite">
        {secret > 0 && (
          <p
            key={secret}
            className="lumi-surprise sticker z-10 w-64 rounded-2xl bg-butter px-4 py-2 text-center font-hand text-xl"
          >
            ✦ you found my wish star! it was <em>your</em> wish that made me,
            all along. ♡
          </p>
        )}
      </div>
    </div>
  );
}
