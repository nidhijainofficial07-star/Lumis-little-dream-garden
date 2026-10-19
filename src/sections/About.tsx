const facts = [
  { label: "name", value: "Lumi", bg: "bg-blush" },
  { label: "species", value: "Fluffy cloud-spirit", bg: "bg-lavender" },
  { label: "role", value: "Dream Collector", bg: "bg-butter" },
  { label: "personality", value: "Curious · gentle · sleepy · playful · kind", bg: "bg-periwinkle" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl font-semibold">
          <span aria-hidden>✦ </span>Character profile
        </h2>
        <p className="mt-2 font-hand text-xl text-muted-foreground">a page from lumi's scrapbook</p>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <ul className="grid content-start gap-4">
            {facts.map((f, i) => (
              <li
                key={f.label}
                className={`sticker ${f.bg} rounded-2xl px-5 py-3`}
                style={{ rotate: `${i % 2 ? 1 : -1}deg` }}
              >
                <span className="font-hand text-lg">{f.label}:</span>{" "}
                <strong className="font-display">{f.value}</strong>
              </li>
            ))}
          </ul>

          <article className="scrap-card relative p-8">
            <span className="sticker absolute -top-4 right-6 rotate-3 bg-butter px-3 py-1 font-hand">
              origin story
            </span>
            <p className="text-lg leading-relaxed">
              Once, on a quiet night, someone made a wish on a falling star — and then, little by
              little, almost forgot it. Just before it faded away, the wish curled up into a soft
              puff of cloud and opened two sleepy eyes. That was Lumi.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Now Lumi floats from rooftop to rooftop with a glowing jar, collecting the dreams
              people leave behind and planting them in a little garden in the sky, where they bloom
              into stars.
            </p>
            <p className="mt-6 font-hand text-2xl">“Every little dream deserves to shine.” ♡</p>
          </article>
        </div>
      </div>
    </section>
  );
}
