
import { useRef, useState } from "react";
import { StoryScene } from "@/components/StoryScene";

const P = "#493858";
const B = "#FFE69A";
const K = "#F7CFE0";
const L = "#CFC5F5";
const W = "#FFF8ED";

const star = (x: number, y: number, s = 1, c = "anim-twinkle") => (
  <path
    className={c}
    transform={`translate(${x} ${y}) scale(${s})`}
    d="M0 -10 l3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z"
    fill={B}
    stroke={P}
    strokeWidth="1.5"
  />
);

const cloud = (x: number, y: number, s = 1) => (
  <path
    transform={`translate(${x} ${y}) scale(${s})`}
    d="M-30 10 q-10 -18 10 -20 q6 -16 24 -8 q16 -8 22 10 q14 4 4 18z"
    fill={W}
    stroke={P}
    strokeWidth="2"
  />
);

const flower = (x: number, y: number, c: string) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M0 0 v28" stroke={P} strokeWidth="2" />
    {[0, 72, 144, 216, 288].map((r) => (
      <ellipse
        key={r}
        rx="5"
        ry="8"
        cy="-7"
        transform={`rotate(${r})`}
        fill={c}
        stroke={P}
        strokeWidth="1.5"
      />
    ))}
    <circle r="4" fill={B} stroke={P} strokeWidth="1.5" />
  </g>
);

export function Story() {
  const [page, setPage] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const totalPages = 5;

  const previous = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLElement>) {
    if (touchStartX.current === null) return;

    const difference = event.changedTouches[0]!.clientX - touchStartX.current;
    touchStartX.current = null;

    if (difference < -50) next();
    if (difference > 50) previous();
  }

  const scenes = [
    <StoryScene
      key={1}
      n={1}
      bg="bg-periwinkle"
      text="A little wish was almost forgotten…"
    >
      {star(40, 30, 0.6)}
      {star(160, 25, 0.5)}
      <g className="anim-float">{star(100, 75, 2.2, "")}</g>
      <circle
        cx="100"
        cy="75"
        r="34"
        fill={B}
        opacity=".25"
        className="anim-twinkle"
      />
    </StoryScene>,

    <StoryScene
      key={2}
      flip
      n={2}
      bg="bg-lavender"
      text="…until it curled into a soft puff of cloud — and Lumi opened two sleepy eyes."
    >
      <g className="anim-float">
        {cloud(100, 85, 1.6)}
        <circle cx="92" cy="80" r="3.5" fill={P} />
        <circle cx="112" cy="80" r="3.5" fill={P} />
        <ellipse cx="84" cy="88" rx="5" ry="3" fill={K} />
        <ellipse cx="120" cy="88" rx="5" ry="3" fill={K} />
      </g>
      {star(150, 35, 0.6)}
      {star(45, 40, 0.5)}
    </StoryScene>,

    <StoryScene
      key={3}
      n={3}
      bg="bg-blush"
      text="Lumi began gathering forgotten dreams in a glowing little jar."
    >
      <circle
        cx="100"
        cy="85"
        r="45"
        fill={B}
        opacity=".4"
        className="anim-twinkle"
      />
      <rect
        x="82"
        y="45"
        width="36"
        height="9"
        rx="3"
        fill={L}
        stroke={P}
        strokeWidth="2"
      />
      <path
        d="M78 55 h44 v50 q0 10 -10 10 h-24 q-10 0 -10 -10z"
        fill={W}
        fillOpacity=".8"
        stroke={P}
        strokeWidth="2"
      />
      {star(92, 80, 0.6)}
      {star(108, 95, 0.5)}
      {star(100, 68, 0.4)}
    </StoryScene>,

    <StoryScene
      key={4}
      flip
      n={4}
      bg="bg-cream"
      text="She planted every dream in a secret garden above the clouds."
    >
      <rect y="118" width="200" height="32" fill={L} />
      {flower(45, 92, K)}
      {flower(100, 80, L)}
      {flower(155, 95, "#B8C9F5")}
      {cloud(170, 30, 0.7)}
      {cloud(40, 35, 0.5)}
    </StoryScene>,

    <StoryScene
      key={5}
      n={5}
      bg="bg-plum"
      text="And one by one, each dream bloomed into a shining star. ✦"
    >
      {(
        [
          [30, 30],
          [70, 55],
          [120, 25],
          [165, 60],
          [50, 100],
          [100, 85],
          [150, 110],
          [180, 25],
        ] as const
      ).map(([x, y], i) => (
        <g
          key={`story-star-${x}-${y}`}
          style={{ animationDelay: `${i * 0.3}s` }}
          className="anim-twinkle"
        >
          {star(x, y, 0.5 + (i % 3) * 0.25, "")}
        </g>
      ))}
    </StoryScene>,
  ];

  return (
    <section
      id="story"
      className="scroll-mt-24 px-6 py-24"
      onKeyDown={handleKeyDown}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl font-semibold">
          <span aria-hidden="true">☾ </span>Lumi's origin story
        </h2>

        <p className="mt-2 font-hand text-xl text-muted-foreground">
          a little interactive storybook — turn the pages to follow Lumi's
          journey
        </p>

        <div
          className="mt-12"
          aria-label={`Story page ${page + 1} of ${totalPages}`}
          aria-live="polite"
        >
          {scenes[page]}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={previous}
            disabled={page === 0}
            className="sticker bg-cream px-5 py-3 font-hand text-xl disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <p className="min-w-24 text-center font-hand text-lg">
            Page {page + 1} of {totalPages}
          </p>

          <button
            type="button"
            onClick={next}
            disabled={page === totalPages - 1}
            className="sticker bg-butter px-5 py-3 font-hand text-xl disabled:cursor-not-allowed disabled:opacity-40"
          >
            {page === totalPages - 1 ? "The End ✨" : "Next →"}
          </button>
        </div>

        <div
          className="mt-5 flex justify-center gap-2"
          aria-label="Choose a story page"
        >
          {scenes.map((scene, index) => (
            <button
              key={`page-dot-${index + 1}`}
              type="button"
              onClick={() => setPage(index)}
              aria-label={`Go to page ${index + 1}`}
              aria-current={page === index ? "step" : undefined}
              className={`relative h-6 w-6 shrink-0 rounded-full border border-border p-1 transition-transform ${
  page === index
    ? "scale-110 bg-plum"
    : "bg-lavender hover:scale-110"
}`}
            />
          ))}
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Tip: focus this story section and use your ← and → arrow keys, or
          swipe left and right on a touch screen.
        </p>
      </div>
    </section>
  );
}
