import { useState } from "react";
import { sounds } from "@/lib/sound";
import { CreationCard } from "./CreationCard";

const spots = [[12, 20], [40, 10], [70, 25], [85, 60], [55, 50], [25, 65], [10, 45], [65, 80], [35, 85]];

export function StarCollector() {
  const [got, setGot] = useState<number[]>([]);
  const all = got.length === spots.length;
  return (
    <CreationCard label="no. 03" title="Star Collector" desc="Catch every star drifting across Lumi's sky." tilt="md:-rotate-1">
      <div className="relative h-44 overflow-hidden rounded-2xl bg-plum">
        {spots.map(([x, y], i) =>
          got.includes(i) ? null : (
            <button
              key={`star-${i}`}
              onClick={() => { setGot((g) => [...g, i]); sounds.tap(); }}
              aria-label={`Collect star ${i + 1}`}
              className="anim-twinkle absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-1 text-2xl text-butter transition-transform hover:scale-150"
              style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.25}s` }}
            >
              ★
            </button>
          ),
        )}
        {all && <p className="anim-bloom absolute inset-0 grid place-items-center font-hand text-2xl text-butter">a whole sky of dreams! ✦</p>}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 rounded-2xl bg-periwinkle text-plum p-3">
        <p aria-live="polite" className="font-hand text-xl">collected: <strong>{got.length}</strong> / {spots.length}</p>
        <button onClick={() => setGot([])} className="sticker bg-cream px-3 font-hand">reset</button>
      </div>
    </CreationCard>
  );
}
