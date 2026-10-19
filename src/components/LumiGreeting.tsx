
import { useEffect, useState } from "react";

const VISIT_KEY = "lumi-dream-garden-visits";
const SESSION_KEY = "lumi-dream-garden-counted-session";

export function LumiGreeting() {
  const [greeting, setGreeting] = useState(
    "Welcome, little dreamer! 🌙 Lumi is so happy you're here.",
  );

  useEffect(() => {
    try {
      let visits = Number(localStorage.getItem(VISIT_KEY) || "0");
      const alreadyCounted =
        sessionStorage.getItem(SESSION_KEY) === "1";

      if (!alreadyCounted) {
        visits += 1;
        localStorage.setItem(VISIT_KEY, String(visits));
        sessionStorage.setItem(SESSION_KEY, "1");
      }

      if (visits <= 1) {
        setGreeting(
          "Welcome, little dreamer! 🌙 Lumi is so happy you're here.",
        );
      } else {
        setGreeting(
          `You're back, little dreamer! 💗 Lumi is happy to see you again. Visit number ${visits}!`,
        );
      }
    } catch {
      setGreeting("Welcome to Lumi's magical little garden! ✨");
    }
  }, []);

  return (
    <div
      className="mx-auto mt-5 max-w-xl rounded-2xl border-2 border-pink-200 bg-pink-50 px-5 py-3 text-center font-hand text-xl text-purple-900 shadow-sm dark:border-purple-700 dark:bg-slate-900 dark:text-pink-100"
      role="status"
      aria-live="polite"
    >
      {greeting}
    </div>
  );
}
