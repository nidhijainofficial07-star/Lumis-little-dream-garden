import { useState } from "react";
import { ToggleControls } from "./ToggleControls";

const links = [
  { href: "#home", label: "home" },
  { href: "#about", label: "about lumi" },
  { href: "#story", label: "story" },
  { href: "#garden", label: "dream garden" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main"
        className="scrap-card mx-auto flex max-w-5xl items-center justify-between px-5 py-3"
      >
<a
  href="#home"
  aria-label="Lumi's Little Dream Garden home"
  className="flex items-center gap-2 font-display text-xl font-semibold"
>
            <span aria-hidden className="anim-wiggle inline-block text-2xl">☁️</span>
          <span className="hidden sm:inline">Lumi's Dream Garden</span>
        </a>
        <div className="flex items-center gap-2 md:order-last">
        <ToggleControls />
        <button
          className="sticker bg-cream px-3 py-1 font-hand text-lg md:hidden"
          aria-expanded={open}
          aria-label="Menu"
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
                  </button>
        </div>
        <ul
          id="nav-links"
          className={`${open ? "flex" : "hidden"} absolute left-4 right-4 top-20 flex-col gap-2 rounded-3xl border-2 border-border bg-cream p-4 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-full px-4 py-1 font-hand text-xl transition-colors hover:bg-blush"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
