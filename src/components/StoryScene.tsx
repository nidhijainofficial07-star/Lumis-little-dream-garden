
import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

export function StoryScene({
  n,
  text,
  bg,
  children,
  flip,
}: {
  n: number;
  text: string;
  bg: string;
  children: ReactNode;
  flip?: boolean;
}) {
  const ref = useReveal<HTMLElement>();

  return (
    <article
  ref={ref}
  className={`reveal grid items-center gap-6 md:grid-cols-2 ${
    flip ? "md:[&>*:first-child]:order-2" : ""
  }`}
  aria-label={`Story page ${n}: ${text}`}
>
      <div
        className={`scrap-card ${bg} relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden`}
      >
        <span className="sticker absolute left-3 top-3 z-10 -rotate-6 bg-cream px-3 font-hand">
          page {n}
        </span>
        <svg
          viewBox="0 0 200 150"
          className="h-full w-full"
          aria-hidden="true"
          focusable="false"
        >
          {children}
        </svg>
      </div>

      <div className="text-center md:text-left">
        <p className="font-hand text-3xl leading-snug">{text}</p>
        <p className="mt-3 font-hand text-lg text-muted-foreground">
          ✦ A little page from Lumi's story ✦
        </p>
      </div>
    </article>
  );
}
