import type { KeyboardEvent } from "react";

type Props = {
  className?: string;
  eye?: { x: number; y: number };
  onJarClick?: () => void;
  onBodyClick?: () => void;
  onAntennaClick?: () => void;
  antennaGlow?: number;
};

const keyAct = (fn?: () => void) => (e: KeyboardEvent) => {
  if (fn && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); fn(); }
};

export function LumiCharacter({
  className = "",
  eye = { x: 0, y: 0 },
  onBodyClick,
  onAntennaClick,
  onJarClick,
  antennaGlow = 0,
}: Props) {
  return (
    <svg viewBox="0 0 320 320" className={className} role="img" aria-labelledby="lumi-title">
      <title id="lumi-title">Lumi, a fluffy cloud-spirit holding a glowing dream jar</title>
      <defs>
        <radialGradient id="body" cx="45%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#E9E3FB" />
        </radialGradient>
        <radialGradient id="jarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF3C2" />
          <stop offset="100%" stopColor="#FFE69A" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* antenna */}
      <path d="M160 92 Q150 60 168 40" stroke="#493858" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g
        className="lumi-antenna anim-glow"
        {...(onAntennaClick ? { role: "button", tabIndex: 0, "aria-label": "Lumi's star", onClick: onAntennaClick, onKeyDown: keyAct(onAntennaClick) } : {})}
      >
        <circle cx="168" cy="40" r={18 + antennaGlow * 4} fill="#FFE69A" opacity={0.15 + antennaGlow * 0.12} />
        <path d="M168 22 l6 12 13 2 -9 9 2 13 -12 -6 -12 6 2 -13 -9 -9 13 -2z" fill="#FFE69A" stroke="#493858" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <g
        style={{ cursor: onBodyClick ? "pointer" : undefined, outline: "none" }}
        {...(onBodyClick ? { role: "button", tabIndex: 0, "aria-label": "Poke Lumi", onClick: onBodyClick, onKeyDown: keyAct(onBodyClick) } : {})}
      >
      {/* cloud body */}
      <path
        d="M70 200 C40 200 38 160 66 152 C58 118 96 98 120 112 C130 82 190 78 204 110 C232 96 268 118 258 150 C290 156 288 202 254 204 C250 236 80 236 70 200Z"
        fill="url(#body)" stroke="#493858" strokeWidth="4" strokeLinejoin="round"
      />
      {/* eyes */}
      <g className="lumi-eyes" style={{ transform: `translate(${eye.x}px, ${eye.y}px)` }}>
      <g className="anim-blink">
        <ellipse cx="135" cy="160" rx="11" ry="14" fill="#493858" />
        <ellipse cx="195" cy="160" rx="11" ry="14" fill="#493858" />
        <circle cx="139" cy="154" r="4" fill="#fff" />
        <circle cx="199" cy="154" r="4" fill="#fff" />
        <circle cx="132" cy="165" r="2" fill="#fff" />
        <circle cx="192" cy="165" r="2" fill="#fff" />
      </g>
      </g>
      {/* cheeks + mouth */}
      <ellipse cx="112" cy="182" rx="14" ry="8" fill="#F7CFE0" />
      <ellipse cx="218" cy="182" rx="14" ry="8" fill="#F7CFE0" />
      <path d="M155 182 Q165 192 175 182" stroke="#493858" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      {/* dream jar */}
      {/* interactive dream jar */}
<g
  transform="translate(232 196) rotate(10)"
  style={{ cursor: onJarClick ? "pointer" : undefined }}
  {...(onJarClick
    ? {
        role: "button" as const,
        tabIndex: 0,
        "aria-label": "Tap Lumi's magical dream jar",
        onClick: (e: React.MouseEvent<SVGGElement>) => {
          e.stopPropagation();
          onJarClick();
        },
        onKeyDown: (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            onJarClick();
          }
        },
      }
    : {})}
>
        <circle
  cx="22"
  cy="40"
  r="42"
  fill="url(#jarGlow)"
  className="anim-twinkle lumi-jar-glow"
/>
        <rect x="6" y="6" width="32" height="8" rx="3" fill="#CFC5F5" stroke="#493858" strokeWidth="3" />
        <path d="M4 16 h36 v40 q0 12 -12 12 h-12 q-12 0 -12 -12z" fill="#FFF8ED" fillOpacity=".7" stroke="#493858" strokeWidth="3" />
        <path d="M22 30 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill="#FFE69A" stroke="#493858" strokeWidth="2" />
        <circle cx="14" cy="54" r="2.5" fill="#F7CFE0" />
        <circle cx="31" cy="56" r="2" fill="#B8C9F5" />
      </g>
      {/* little arm */}
      <path d="M236 206 q8 4 6 14" stroke="#493858" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
