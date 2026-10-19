
import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

const treasures = [
  { id: 1, x: 18, y: 0.12, message: "You are a little star that can shine anywhere! ⭐" },
  { id: 2, x: 78, y: 0.27, message: "You are braver than you know! 🦋" },
  { id: 3, x: 38, y: 0.43, message: "Your imagination is pure magic! 🪄" },
  { id: 4, x: 84, y: 0.59, message: "The world is happier with you in it! 💗" },
  { id: 5, x: 23, y: 0.74, message: "Keep dreaming, little explorer! 🌈" },
  { id: 6, x: 66, y: 0.89, message: "You discovered a little piece of magic! ✨" },
];

const sparkleEmojis = ["✨", "⭐", "💖", "🌟", "🩷", "✦"];

type Sprinkle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  emoji: string;
};

export function DreamExplorer() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [pageHeight, setPageHeight] = useState(3000);
  const [scrollY, setScrollY] = useState(0);
  const [collected, setCollected] = useState<number[]>([]);
  const [message, setMessage] = useState("");
  const [sprinkles, setSprinkles] = useState<Sprinkle[]>([]);
  const [completed, setCompleted] = useState(false);
  const [draggingTorch, setDraggingTorch] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    function updatePage() {
      setPageHeight(document.documentElement.scrollHeight);
      setScrollY(window.scrollY);
    }

    updatePage();
    window.addEventListener("scroll", updatePage);
    window.addEventListener("resize", updatePage);

    return () => {
      window.removeEventListener("scroll", updatePage);
      window.removeEventListener("resize", updatePage);
    };
  }, [mounted]);

  

useEffect(() => {
  if (!enabled) return;

  let startX = 0;
  let startY = 0;
  let gesture: "pending" | "scroll" | "torch" = "pending";

  function handlePointerMove(event: PointerEvent) {
    // Desktop mouse movement.
    setPosition({ x: event.clientX, y: event.clientY });
  }

  function handleTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    if (!touch) return;

    startX = touch.clientX;
    startY = touch.clientY;
    gesture = "pending";

    setPosition({ x: touch.clientX, y: touch.clientY });
  }

  function handleTouchMove(event: TouchEvent) {
    const touch = event.touches[0];
    if (!touch) return;

    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;

    // Decide the gesture after the finger moves a little.
    if (gesture === "pending" && Math.hypot(dx, dy) > 10) {
      gesture = Math.abs(dx) > Math.abs(dy) ? "torch" : "scroll";
    }

    if (gesture === "torch") {
      // Horizontal movement: move the torch, not the page.
      if (event.cancelable) event.preventDefault();
      setPosition({ x: touch.clientX, y: touch.clientY });
    }

    // For vertical movement, don't preventDefault().
    // The browser can scroll the page normally.
  }

  function handleTouchEnd() {
    gesture = "pending";
  }

  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerdown", handlePointerMove);
  window.addEventListener("touchstart", handleTouchStart, {
    passive: true,
  });
  window.addEventListener("touchmove", handleTouchMove, {
    passive: false,
  });
  window.addEventListener("touchend", handleTouchEnd);
  window.addEventListener("touchcancel", handleTouchEnd);

  return () => {
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerdown", handlePointerMove);
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
    window.removeEventListener("touchcancel", handleTouchEnd);
  };
}, [enabled]);



  function playCuteSound() {
    try {
      const audio = new AudioContext();

      [880, 1174.66].forEach((frequency, index) => {
        const start = audio.currentTime + index * 0.09;
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, start);

        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.12, start + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.start(start);
        oscillator.stop(start + 0.34);
      });

      window.setTimeout(() => {
        void audio.close();
      }, 700);
    } catch {
      // The treasure hunt still works if sound is unavailable.
    }
  }

  function toggleExplorer() {
    if (!enabled) {
      setPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
      setMessage("Find the hidden gems with your magical torch! 🔦");
    } else {
      setMessage("");
    }

    setEnabled((value) => !value);
  }

  function collectGem(
    id: number,
    gemMessage: string,
    x: number,
    y: number
  ) {
    if (collected.includes(id)) return;

    const burst: Sprinkle[] = Array.from({ length: 16 }, (_, index) => {
      const angle = (Math.PI * 2 * index) / 16;
      const distance = 35 + (index % 4) * 14;

      return {
        id: Date.now() + index,
        x,
        y,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance - 15,
        emoji: sparkleEmojis[index % sparkleEmojis.length] ?? "✨",
      };
    });

    setCollected((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
    setSprinkles((previous) => [...previous, ...burst]);
    setMessage(gemMessage);
    playCuteSound();

    if (collected.length + 1 >= treasures.length) {
      setCompleted(true);
      setMessage("");
    }
  }

  if (!mounted) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes dream-sprinkle-burst {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(0.5) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(var(--dx), var(--dy))
              scale(1.5) rotate(180deg);
          }
        }
        .dream-sprinkle {
          animation: dream-sprinkle-burst 900ms ease-out forwards;
          pointer-events: none;
        }
      `}</style>

      {enabled && (
        <div
          aria-hidden="true"
          className="pointer-events-none"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: `radial-gradient(circle 125px at ${position.x}px ${position.y}px, transparent 0%, rgba(18, 10, 35, 0.18) 55%, rgba(18, 10, 35, 0.94) 100%)`,
          }}
        />
      )}

      {enabled &&
        treasures.map((gem) => {
          const gemY = gem.y * pageHeight - scrollY;

          const distance = Math.hypot(
            (gem.x / 100) * window.innerWidth - position.x,
            gemY - position.y
          );

          if (collected.includes(gem.id)) return null;

          return (
            <button
              key={gem.id}
              type="button"
              aria-label={`Discover hidden gem ${gem.id}`}
              title="You found a hidden gem!"
              onClick={() =>
                collectGem(
                  gem.id,
                  gem.message,
                  (gem.x / 100) * window.innerWidth,
                  gemY
                )
              }
              className="rounded-full p-2 text-3xl transition-transform duration-200 hover:scale-125"
              style={{
                position: "fixed",
                left: `${gem.x}%`,
                top: gemY,
                transform: "translate(-50%, -50%)",
                zIndex: 1002,
                opacity: distance < 145 ? 1 : 0,
                pointerEvents: distance < 145 ? "auto" : "none",
                filter: "drop-shadow(0 0 12px #ffe89a)",
              }}
            >
              💎
            </button>
          );
        })}

      {sprinkles.map((particle) => (
        <span
          key={particle.id}
          aria-hidden="true"
          className="dream-sprinkle fixed text-xl"
          onAnimationEnd={() =>
            setSprinkles((previous) =>
              previous.filter((item) => item.id !== particle.id)
            )
          }
          style={
            {
              left: particle.x,
              top: particle.y,
              zIndex: 10010,
              "--dx": `${particle.dx}px`,
              "--dy": `${particle.dy}px`,
            } as CSSProperties
          }
        >
          {particle.emoji}
        </span>
      ))}

      {enabled && (
        <div
          className="pointer-events-none rounded-full border border-pink-200 bg-white/95 px-5 py-2 font-semibold text-purple-800 shadow-xl"
          style={{
            position: "fixed",
            bottom: "96px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1003,
          }}
        >
          💎 Gems found: {collected.length}/{treasures.length}
        </div>
      )}

      {enabled && message && !completed && (
        <div
          role="status"
          className="pointer-events-none w-[min(90%,360px)] rounded-3xl border-2 border-pink-200 bg-white p-4 text-center font-hand text-xl text-purple-800 shadow-xl"
          style={{
            position: "fixed",
            bottom: "148px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1003,
          }}
        >
          {message}
        </div>
      )}

      {completed && enabled && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-purple-950/50 p-5"
          style={{ zIndex: 10005 }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dream-complete-title"
            className="w-full max-w-sm rounded-[2rem] border-4 border-pink-200 bg-gradient-to-b from-white to-pink-50 p-7 text-center shadow-2xl"
          >
            <div className="mb-3 text-5xl">🎉💎✨</div>
            <h2
              id="dream-complete-title"
              className="font-hand text-3xl font-bold text-purple-800"
            >
              You found all the gems!
            </h2>
            <p className="mt-3 text-purple-700">
              Every little sparkle was waiting for you. You are a true Dream
              Explorer! 💖
            </p>
            <div className="my-5 text-2xl">🌈 ⭐ 🦋 🌸 ⭐ 🌈</div>
            <button
              type="button"
              onClick={() => {
  setCompleted(false);
  setEnabled(false);
  setMessage("You found every gem! You're amazing! 💖");
}}
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              Yay! ✨
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={toggleExplorer}
        aria-pressed={enabled}
        className="fixed bottom-5 left-5 z-[9999] rounded-full border-2 border-white/80 bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-3 font-semibold text-white shadow-xl transition-transform hover:scale-105"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          right: "auto",
          top: "auto",
          zIndex: 99999,
        }}
      >
        {enabled ? "☀️ Exit Explore" : "🔦 Magic Torch"}
      </button>
    </>,
    document.body
  );
}
