import type { ReactNode } from "react";

export function CreationCard({
  label, title, desc, tilt, children,
}: { label: string; title: string; desc: string; tilt: string; children: ReactNode }) {
  return (
    <article className={`scrap-card relative flex flex-col p-6 pt-8 transition-transform hover:-translate-y-1 ${tilt}`}>
      <span className="sticker absolute -top-4 left-6 -rotate-3 bg-butter px-3 font-hand text-lg">{label}</span>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mt-1 text-muted-foreground">{desc}</p>
      <div className="mt-5 flex flex-1 flex-col">{children}</div>
    </article>
  );
}
