import { getPrefs } from "./prefs";

let ctx: AudioContext | null = null;

/** Soft bell-like chime. Only plays after a user gesture and when sound is on. */
export function chime(notes: number[] = [880], gap = 0.09) {
  if (!getPrefs().sound || typeof window === "undefined") return;
  try {
    ctx ??= new AudioContext();
    const t0 = ctx.currentTime;
    notes.forEach((f, i) => {
      const o = ctx!.createOscillator();
      const g = ctx!.createGain();
      o.type = "sine";
      o.frequency.value = f;
      const t = t0 + i * gap;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.12, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      o.connect(g).connect(ctx!.destination);
      o.start(t);
      o.stop(t + 0.65);
    });
  } catch {}
}

export const sounds = {
  tap: () => chime([988]),
  sparkle: () => chime([1047, 1319, 1568], 0.07),
  bloom: () => chime([659, 880]),
  secret: () => chime([523, 659, 784, 1047, 1319, 1568], 0.1),
};

let musicTimer: ReturnType<typeof setTimeout> | undefined;
let musicActive = false;
let musicIndex = 0;
let musicNight = false;

const dayMelody = [
  { note: 523, duration: 240 },
  { note: 659, duration: 240 },
  { note: 784, duration: 300 },
  { note: 1047, duration: 300 },
  { note: 784, duration: 240 },
  { note: 880, duration: 240 },
  { note: 1047, duration: 400 },
  { note: 880, duration: 240 },
];

const nightMelody = [
  { note: 392, duration: 750 },
  { note: 349, duration: 850 },
  { note: 294, duration: 900 },
  { note: 349, duration: 850 },
  { note: 330, duration: 750 },
  { note: 294, duration: 1000 },
  { note: 262, duration: 1100 },
  { note: 294, duration: 1200 },
];

export function stopDreamMusic() {
  musicActive = false;
  clearTimeout(musicTimer);
}

export function startDreamMusic() {
  if (!getPrefs().sound || typeof window === "undefined") return;

  musicNight = getPrefs().night;
  musicIndex = 0;
  musicActive = true;
  clearTimeout(musicTimer);

  try {
    ctx ??= new AudioContext();
    const audio = ctx;

    const playNext = async () => {
      if (!musicActive || !getPrefs().sound) {
        stopDreamMusic();
        return;
      }

      if (audio.state === "closed") {
        stopDreamMusic();
        return;
      }

      if (musicNight !== getPrefs().night) {
        musicNight = getPrefs().night;
        musicIndex = 0;
      }

      await audio.resume();

      if (!musicActive) return;

      const melody = musicNight ? nightMelody : dayMelody;
      const current = melody[musicIndex % melody.length];
      if (!current) return;
      const now = audio.currentTime;

      // Main soft piano-like note
      const piano = audio.createOscillator();
      const gain = audio.createGain();

      piano.type = "sine";
      piano.frequency.setValueAtTime(current.note, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(
        musicNight ? 0.07 : 0.12,
        now + (musicNight ? 0.18 : 0.035),
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + current.duration / 1000,
      );

      piano.connect(gain);
      gain.connect(audio.destination);
      piano.start(now);
      piano.stop(now + current.duration / 1000 + 0.05);

      // Sparkly daytime bells; gentle nighttime chimes
      if (musicNight || musicIndex % 2 === 0) {
        const bell = audio.createOscillator();
        const bellGain = audio.createGain();

        bell.type = "sine";
        bell.frequency.value = current.note * (musicNight ? 1.5 : 2);
        bellGain.gain.setValueAtTime(0.0001, now);
        bellGain.gain.linearRampToValueAtTime(
          musicNight ? 0.025 : 0.04,
          now + 0.08,
        );
        bellGain.gain.exponentialRampToValueAtTime(
          0.0001,
          now + (musicNight ? 0.8 : 0.45),
        );

        bell.connect(bellGain);
        bellGain.connect(audio.destination);
        bell.start(now);
        bell.stop(now + (musicNight ? 0.85 : 0.5));
      }

      musicIndex++;
      musicTimer = setTimeout(
        playNext,
        current.duration + (musicNight ? 250 : 100),
      );
    };

    void playNext().catch((error) => {
      console.error("Dream music error:", error);
      stopDreamMusic();
    });
  } catch (error) {
    console.error("Could not start dream music:", error);
    stopDreamMusic();
  }
}