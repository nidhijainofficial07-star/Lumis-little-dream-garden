import { useState } from "react";
import { sounds } from "@/lib/sound";
import { CreationCard } from "./CreationCard";

const flowers = [
  { color: "bg-blush", msg: "You're doing better than you think. 🌸" },
  { color: "bg-lavender", msg: "Tonight's dream: floating on marshmallow clouds." },
  { color: "bg-periwinkle", msg: "Small steps still go somewhere. 💙" },
  { color: "bg-butter", msg: "Someone is smiling because of you today." },
  { color: "bg-blush", msg: "Rest is part of growing, too. 🌱" },
];

export function WishGarden() {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <CreationCard label="no. 02" title="Wish Garden" desc="Pick a flower to read the dream sleeping inside." tilt="md:rotate-1">
      <div className="flex items-end justify-center gap-2 rounded-2xl bg-lavender/40 px-2 pb-2 pt-6">
        {flowers.map((f, i) => (
          <button
            key={`flower-${i}`}
            onClick={() => { setPicked(i); sounds.bloom(); }}
            aria-pressed={picked === i}
            aria-label={`Flower ${i + 1}`}
            className="group flex flex-col items-center rounded-xl p-1"
            style={{ marginBottom: (i % 2) * 10 }}
          >
            <span className={`${f.color} grid h-10 w-10 place-items-center rounded-full border-2 border-border text-lg text-plum transition-transform group-hover:rotate-45 group-hover:scale-110 ${picked === i ? "scale-125" : ""}`}>
              ✿
            </span>
            <span className="h-8 w-0.5 bg-plum" />
          </button>
        ))}
      </div>
      <p aria-live="polite" key={picked ?? -1} className="anim-bloom mt-4 min-h-[3.5rem] rounded-2xl bg-butter text-plum p-3 text-center font-hand text-xl">
        {picked === null ? "the flowers are waiting for you…" : flowers[picked]?.msg}
      </p>
    </CreationCard>
  );
}
