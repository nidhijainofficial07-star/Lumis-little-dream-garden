import { InteractiveLumi } from "@/components/InteractiveLumi";

const stars = [
  [8, 12], [22, 30], [85, 18], [70, 8], [92, 55], [5, 70], [40, 6], [60, 75],
];

export function Hero() {
  return (
    <section id="home" className="bg-sky relative -mt-24 overflow-hidden px-6 pb-24 pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {stars.map(([x, y], i) => (
          <span
            key={`twinkle-${i}`}
            className="anim-twinkle absolute text-butter"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s`, fontSize: 14 + (i % 3) * 8 }}
          >
            ✦
          </span>
        ))}
        <span className="day-only anim-drift absolute top-[20%] text-6xl opacity-70">☁</span>
        <span className="day-only absolute right-[8%] top-[14%] h-16 w-16 rounded-full bg-butter shadow-[0_0_60px_var(--butter)]" />
        <span className="night-only absolute right-[8%] top-[14%] h-16 w-16 rounded-full bg-cream shadow-[0_0_50px_var(--cream)]">
          <span className="absolute left-3 top-4 h-3 w-3 rounded-full bg-lavender/60" />
          <span className="absolute bottom-4 right-4 h-4 w-4 rounded-full bg-lavender/50" />
        </span>
      </div>

      <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <div>
          <span className="sticker inline-block -rotate-3 bg-blush px-4 py-1 font-hand text-lg">
            ✿ welcome to my lil corner of the sky
          </span>
          <h1 className="mt-5 text-5xl font-semibold leading-tight sm:text-6xl">
            Hi, dreamer! <br /> I'm <span className="hero-name text-plum underline decoration-butter decoration-8 underline-offset-4">Lumi</span>.
          </h1>
          <p className="mt-3 font-hand text-2xl">“Every little dream deserves to shine.”</p>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            I'm a tiny cloud-spirit who gathers forgotten dreams and tucks them into my jar,
            where they slowly grow into stars.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#garden" className="sticker bg-butter px-6 py-3 font-display font-semibold">
              Visit the garden ✦
            </a>
            <a href="#about" className="sticker bg-cream px-6 py-3 font-display font-semibold">
              Meet Lumi ☁
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div aria-hidden className="absolute inset-8 rounded-full bg-butter/50 blur-3xl" />
          <InteractiveLumi />
          <span className="sticker absolute -bottom-2 left-2 rotate-6 bg-lavender px-3 py-1 font-hand">
            psst… it's sleepy
          </span>
        </div>
      </div>
    </section>
  );
}
