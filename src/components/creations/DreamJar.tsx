
import { useEffect, useState } from "react";
import { sounds } from "@/lib/sound";
import { supabase } from "@/lib/supabase";
import { CreationCard } from "./CreationCard";

type GuestbookWish = {
  id: string;
  name: string;
  wish: string;
  created_at: string;
};

export function DreamJar() {
  const [wishes, setWishes] = useState<GuestbookWish[]>([]);
  const [wish, setWish] = useState<GuestbookWish | null>(null);
  const [burst, setBurst] = useState(0);
  
const [collected, setCollected] = useState(0);

useEffect(() => {
  try {
    const saved = Number(
      localStorage.getItem("lumi-dreams-collected") || 0
    );

    setCollected(
      Number.isFinite(saved) && saved >= 0 ? saved : 0
    );
  } catch {
    // The jar still works if storage is unavailable.
  }
}, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishes() {
      const { data, error } = await supabase
        .from("dream_wishes")
        .select("id, name, wish, created_at")
        .order("created_at", { ascending: false })
        .limit(100);

      if (!error && data) {
        setWishes(data);
      }

      setLoading(false);
    }

    void loadWishes();

    const channel = supabase
      .channel("dream-jar-guestbook-wishes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "dream_wishes",
        },
        () => {
          void loadWishes();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  
useEffect(() => {
  try {
    const saved = JSON.parse(
      localStorage.getItem("lumi-dreams-discovered") || "[]"
    ) as string[];

    setCollected(new Set(saved).size);
  } catch {
    setCollected(0);
  }
}, []);


  const open = () => {
    if (wishes.length === 0) {
      sounds.sparkle();
      return;
    }

    const availableWishes = wishes.filter(
      (item) => item.id !== wish?.id
    );

    const choices =
      availableWishes.length > 0 ? availableWishes : wishes;

    const nextWish =
      choices[Math.floor(Math.random() * choices.length)];

    if (!nextWish) return;

    
setWish(nextWish);
setBurst((count) => count + 1);

try {
  const key = "lumi-dreams-discovered";
  const saved = JSON.parse(
    localStorage.getItem(key) || "[]"
  ) as string[];

  if (!saved.includes(nextWish.id)) {
    const updated = [...saved, nextWish.id];

    localStorage.setItem(key, JSON.stringify(updated));
    setCollected(updated.length);
  }
} catch {
  // The jar still opens if storage is unavailable.
}

sounds.sparkle();

  };

  return (
    <CreationCard
      label="no. 01"
      title="Dream Jar"
      desc="Tap the jar to discover a wish from our Dream Guestbook."
      tilt="md:-rotate-1"
    >
      <button
        onClick={open}
        aria-label="Open the dream jar"
        className="relative mx-auto block rounded-3xl p-2"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          {burst > 0 &&
            [-40, -10, 20, 45, 5].map((x, i) => (
              <span
                key={`${burst}-sparkle-${i}`}
                className="anim-pop absolute left-1/2 top-1/3 text-butter"
                style={{
                  marginLeft: x,
                  ["--rise" as string]: `${-40 - i * 12}px`,
                  animationDelay: `${i * 0.06}s`,
                  fontSize: 18 + i * 3,
                }}
              >
                ✦
              </span>
            ))}
        </span>

        <svg
  viewBox="0 0 100 120"
          aria-hidden="true"
          className="anim-glow anim-wish-jar h-36 w-32"
        >
          <rect
            x="28"
            y="10"
            width="44"
            height="12"
            rx="4"
            fill="#CFC5F5"
            stroke="#493858"
            strokeWidth="3"
          />
          <path
            d="M22 24 h56 v66 q0 18 -18 18 h-20 q-18 0 -18 -18z"
            fill="#FFF8ED"
            stroke="#493858"
            strokeWidth="3"
          />
          <circle cx="50" cy="66" r="22" fill="#FFE69A" opacity=".55" />
          <path
            d="M50 52 l4 9 9 1 -7 6 2 9 -8 -4 -8 4 2 -9 -7 -6 9 -1z"
            fill="#FFE69A"
            stroke="#493858"
            strokeWidth="2"
          />
        </svg>
      </button>

      <div
        key={wish?.id ?? "empty"}
        aria-live="polite"
        className="anim-wish-float mt-4 min-h-[5rem] rounded-2xl bg-blush p-3 text-center"
        style={{ color: "var(--plum)" }}
      >
        {loading ? (
          <p className="font-hand text-xl">
            Gathering little dreams... ☁️
          </p>
        ) : wish ? (
          <>
            <p className="font-hand text-xl">
              “{wish.wish}” ✨
            </p>
            <p className="mt-2 font-hand text-sm font-bold">
              — {wish.name || "A dreamer"}
            </p>
          </>
        ) : wishes.length > 0 ? (
          <p className="font-hand text-xl">
            Tap the jar to discover a little wish! 💌
          </p>
        ) : (
          <p className="font-hand text-xl">
            No wishes yet! Leave the first wish in our Guestbook. 💗
          </p>
        )}
      </div>

      <p
        className="mt-2 text-center font-hand text-lg"
        style={{ color: "var(--plum)" }}
      >
        ✨ Dreams discovered: {collected}
      </p>
    </CreationCard>
  );
}

export default DreamJar;
