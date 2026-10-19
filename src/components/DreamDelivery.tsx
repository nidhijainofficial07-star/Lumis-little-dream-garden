
import { useEffect, useRef, useState } from "react";

const ROUTE = "M45 48 Q90 108 145 96 T255 50 T355 112";

const STOPS = [
  {
    x: 45,
    y: 48,
    label: "Lumi's Home",
    symbol: "⌂",
    title: "Where every dream begins",
    message: "Lumi is packing a tiny dream just for you. 💌",
    color: "#FFE6F2",
  },
  {
    x: 145,
    y: 96,
    label: "Cloud Village",
    symbol: "☁",
    title: "The village of little wishes",
    message: "Every cloud is carrying a wish waiting to come true. ☁️",
    color: "#E5DCFF",
  },
  {
    x: 255,
    y: 50,
    label: "Dream Meadow",
    symbol: "✿",
    title: "Where dreams bloom",
    message: "Be patient with your dreams. Even little flowers need time. 🌸",
    color: "#FFECC7",
  },
  {
    x: 355,
    y: 112,
    label: "Star Garden",
    symbol: "★",
    title: "A dream delivered!",
    message: "Your dreams are made of stardust. Keep believing in yourself! ✨",
    color: "#FFF0AE",
  },
];

export function DreamDelivery() {
  const mapRef = useRef<HTMLElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const lastSoundStop = useRef(-1);

  const [progress, setProgress] = useState(0);
  const [deliveryPoint, setDeliveryPoint] = useState({
    x: 45,
    y: 48,
  });
  const [selectedStop, setSelectedStop] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Scroll-linked delivery progress.
  useEffect(() => {
    const section = mapRef.current;
    if (!section) return;

    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const travelDistance = rect.height + window.innerHeight;
const travelled = window.innerHeight - rect.top;
const next = Math.max(0, Math.min(1, travelled / travelDistance));

        setProgress((previous) =>
          Math.abs(previous - next) > 0.002 ? next : previous,
        );
      });
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // Keep Lumi on the SVG route.
  useEffect(() => {
    const route = routeRef.current;
    if (!route) return;

    const total = route.getTotalLength();
    const point = route.getPointAtLength(total * progress);

    setDeliveryPoint({ x: point.x, y: point.y });
  }, [progress]);

  const reachedStops = STOPS.map((_, index) =>
    progress >= index / (STOPS.length - 1),
  );

  const reachedCount = reachedStops.filter(Boolean).length;

  // Optional gentle sound when a new destination is reached.
  useEffect(() => {
    if (!soundEnabled) return;

    const stopIndex = Math.floor(progress * (STOPS.length - 1));

    if (lastSoundStop.current === stopIndex) return;
    lastSoundStop.current = stopIndex;

    try {
      const audio =
        audioRef.current ??
        new AudioContext();

      audioRef.current = audio;

      if (audio.state === "suspended") {
        void audio.resume();
      }

      const oscillator = audio.createOscillator();
      const gain = audio.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = [523, 659, 784, 1047][stopIndex] ?? 523;
      gain.gain.setValueAtTime(0.0001, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.08,
        audio.currentTime + 0.04,
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + 0.35,
      );

      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + 0.36);
    } catch {
      // The map remains fully usable if audio is unavailable.
    }
  }, [progress, soundEnabled]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        void audioRef.current.close();
      }
    };
  }, []);

  const activeStop =
    selectedStop !== null
      ? selectedStop
      : Math.min(
          STOPS.length - 1,
          Math.floor(progress * STOPS.length),
        );
        

  const message =
    progress >= 0.98
      ? "Dream delivered! Every little wish deserves to shine. 💗"
      : progress < 0.12
        ? "Lumi is packing a little dream... 💌"
        : progress < 0.42
          ? "Flying through the clouds! ☁️"
          : progress < 0.75
            ? "Almost there, little dreamer! ✨"
            : "The Star Garden is waiting! 🌟";
const currentStop = STOPS[activeStop] ?? STOPS[0]!;
  return (
    <section
      ref={mapRef}
      aria-labelledby="dream-delivery-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-lavender/40 px-4 py-20 sm:px-6"
    >
      {/* Floating magical decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[6%] top-20 animate-pulse text-2xl text-purple-300"
      >
        ✦
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-32 animate-bounce text-2xl text-pink-300"
        style={{ animationDuration: "4s" }}
      >
        ✧
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 left-[8%] animate-pulse text-4xl opacity-50"
      >
        ☁️
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-28 right-[8%] animate-pulse text-4xl opacity-50"
        style={{ animationDelay: "1s" }}
      >
        ☁️
      </div>

      <div className="relative mx-auto max-w-5xl">
        <p className="font-hand text-xl text-muted-foreground">
          ✉ A tiny journey through the clouds
        </p>

        <h2
          id="dream-delivery-title"
          className="mt-2 text-3xl font-semibold md:text-4xl"
        >
          Lumi's Dream Delivery Map
        </h2>

        <p className="mt-3 max-w-xl text-muted-foreground">
          Follow Lumi through a magical world where every stop holds
          a little dream. Scroll to travel, or tap a destination to
          discover its secret.
        </p>

        {/* Progress and sound controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div
            className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-white/70"
            role="progressbar"
            aria-label="Dream delivery progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-300 via-purple-300 to-amber-200 transition-[width] duration-150"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <span className="whitespace-nowrap text-sm text-muted-foreground">
            {reachedCount} of {STOPS.length} stops
          </span>

          <button
            type="button"
            aria-pressed={soundEnabled}
            onClick={() => setSoundEnabled((enabled) => !enabled)}
            className="rounded-full border border-purple-200 bg-white/80 px-3 py-2 text-sm text-purple-800 transition hover:bg-purple-50 focus-visible:outline-2 focus-visible:outline-purple-500"
          >
            {soundEnabled ? "🔊 Sound on" : "🔇 Sound off"}
          </button>
        </div>

        {/* Magical map */}
        <div className="relative mt-6 overflow-hidden rounded-[2rem] border-2 border-white/80 bg-gradient-to-br from-[#FFF8FC] via-[#F5F0FF] to-[#FFF8DF] p-2 shadow-xl shadow-purple-200/30 sm:p-5">
          <svg
            viewBox="0 0 400 180"
            className="w-full overflow-visible"
            role="group"
            aria-label="Interactive dream delivery map"
          >
            <defs>
              <linearGradient
                id="lumiDreamTrail"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#F5A8D0" />
                <stop offset="55%" stopColor="#BBA6FF" />
                <stop offset="100%" stopColor="#F8CE72" />
              </linearGradient>

              <filter
                id="lumiDreamGlow"
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
              >
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Twinkling stars */}
            {[
              [24, 95],
              [88, 20],
              [116, 143],
              [195, 28],
              [220, 132],
              [298, 18],
              [326, 67],
              [385, 37],
              [26, 158],
              [290, 157],
            ].map(([x, y], index) => (
              <text
                key={`${x}-${y}`}
                x={x}
                y={y}
                fontSize={index % 3 === 0 ? 11 : 8}
                fill={index % 2 === 0 ? "#E8B9D9" : "#C7B5F6"}
                className="animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                ✦
              </text>
            ))}

            {/* Soft dreamland hills */}
            <path
              d="M0 153 Q50 125 100 153 T200 149 T300 151 T400 143 L400 180 L0 180 Z"
              fill="#E6DFFB"
              opacity="0.7"
            />
            <path
              d="M0 167 Q70 143 130 165 T260 164 T400 158 L400 180 L0 180 Z"
              fill="#F7DCEB"
              opacity="0.8"
            />

            {/* Untravelled route */}
            <path
              d={ROUTE}
              fill="none"
              stroke="#D8CBEF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="2 9"
            />

            {/* Glowing trail */}
            <path
              d={ROUTE}
              fill="none"
              stroke="#D8B8F5"
              strokeWidth="8"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={1 - progress}
              filter="url(#lumiDreamGlow)"
              opacity="0.45"
            />

            <path
              ref={routeRef}
              d={ROUTE}
              fill="none"
              stroke="url(#lumiDreamTrail)"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={1 - progress}
            />

            {/* Interactive destinations */}
            {STOPS.map((stop, index) => {
              const reached = reachedStops[index];
              const selected = selectedStop === index;
              const currentStop = STOPS[activeStop] ?? STOPS[0];

              return (
                <g
                  key={stop.label}
                  role="button"
                  tabIndex={0}
                  aria-label={`${stop.label}: ${stop.title}`}
                  aria-pressed={selected}
                  onClick={() => setSelectedStop(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedStop(index);
                    }
                  }}
                  className="cursor-pointer outline-none"
                >
                  <title>{`${stop.label}: ${stop.title}`}</title>

                  {(reached || selected) && (
                    <circle
                      cx={stop.x}
                      cy={stop.y}
                      r={selected ? 22 : 19}
                      fill={stop.color}
                      opacity="0.7"
                    />
                  )}

                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r={selected ? 16 : 14}
                    fill={reached ? "#FFE69A" : "#F7CFE0"}
                    stroke={selected ? "#8C70C6" : reached ? "#D5A85A" : "#DABBD5"}
                    strokeWidth={selected ? 3 : 2}
                  />

                  <text
                    x={stop.x}
                    y={stop.y + 5}
                    textAnchor="middle"
                    fontSize="15"
                    fill="#493858"
                    pointerEvents="none"
                  >
                    {stop.symbol}
                  </text>

                  <text
                    x={stop.x}
                    y={stop.y + 30}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="600"
                    fill="#493858"
                    pointerEvents="none"
                  >
                    {stop.label}
                  </text>

                  {reached && (
                    <text
                      x={stop.x + 10}
                      y={stop.y - 11}
                      fontSize="10"
                      fill="#B38A45"
                      pointerEvents="none"
                    >
                      ✓
                    </text>
                  )}
                </g>
              );
            })}

            {/* Lumi carrying a tiny dream */}
            <g
              transform={`translate(${deliveryPoint.x} ${deliveryPoint.y - 16})`}
              filter="url(#lumiDreamGlow)"
              pointerEvents="none"
            >
              <circle
                r="13"
                fill="#FFF8FC"
                stroke="#D9A7D0"
                strokeWidth="2"
              />
              <ellipse
                cx="-5"
                cy="-5"
                rx="5"
                ry="4"
                fill="white"
                opacity="0.9"
              />
              <circle cx="-4" cy="-1" r="1.6" fill="#493858" />
              <circle cx="4" cy="-1" r="1.6" fill="#493858" />
              <circle cx="-7" cy="3" r="2.5" fill="#F2A7C7" />
              <circle cx="7" cy="3" r="2.5" fill="#F2A7C7" />
              <path
                d="M-3 4 Q0 7 3 4"
                fill="none"
                stroke="#493858"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <text x="10" y="-10" fontSize="10" fill="#D5A85A">
                ✨
              </text>
            </g>
          </svg>

          {/* Selected destination story */}
          
<div
  className="mx-1 mt-2 rounded-2xl border border-white/80 p-4 transition-colors sm:mx-2"
  style={{
    backgroundColor: currentStop.color,
  }}
  aria-live="polite"
>
  <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">
    {currentStop.symbol} {currentStop.label}
  </p>

  <h3 className="mt-1 text-lg font-semibold text-[#493858]">
    {currentStop.title}
  </h3>

  <p className="mt-1 text-sm leading-relaxed text-[#493858]">
    {currentStop.message}
  </p>

  {progress >= 0.95 && activeStop === STOPS.length - 1 && (
    <p className="mt-3 font-hand text-xl text-purple-800">
      🎁 Delivered with love!
    </p>
  )}
</div>

        </div>

        {/* Tap-friendly destination buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STOPS.map((stop, index) => (
            <button
              key={stop.label}
              type="button"
              onClick={() => setSelectedStop(index)}
              aria-pressed={selectedStop === index}
              className={`rounded-2xl border px-3 py-3 text-left transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-purple-500 ${
                selectedStop === index
                  ? "border-purple-400 bg-purple-100/80 shadow-sm"
                  : "border-white/80 bg-white/70"
              }`}
            >
              <span className="text-xl">{stop.symbol}</span>
              <span className="mt-1 block text-sm font-medium text-[#493858]">
                {stop.label}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {reachedStops[index] ? "Dream discovered ✓" : "A dream awaits"}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-5 min-h-8 text-center font-hand text-xl text-purple-800 sm:text-2xl">
          {message}
        </p>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          Scroll to travel · Tap a destination to explore · Every dream matters ✨
        </p>
      </div>
    </section>
  );
}
