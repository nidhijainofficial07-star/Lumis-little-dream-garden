import { useEffect } from "react";
import { initPrefs, setPref, usePrefs } from "@/lib/prefs";
import {
  sounds,
  startDreamMusic,
  stopDreamMusic,
} from "@/lib/sound";

export function ToggleControls() {
  const { night, sound } = usePrefs();
  useEffect(() => initPrefs(), []);
  return (
    <div className="flex items-center gap-2">
      <button
        className="sticker bg-butter px-3 py-1 font-hand text-lg"
        aria-pressed={night}
        aria-label={night ? "Switch to daytime garden" : "Switch to nighttime garden"}
        onClick={() => setPref("night", !night)}
      >
        {night ? "☀ day" : "☾ night"}
      </button>
      <button
  className="sticker bg-lavender px-3 py-1 font-hand text-lg"
  aria-pressed={sound}
  aria-label={`♪ ${sound ? "on" : "off"}`}
  onClick={() => {
    const nextSound = !sound;
    setPref("sound", nextSound);

    if (nextSound) {
      startDreamMusic();
    } else {
      stopDreamMusic();
    }
  }}
>
  ♪ {sound ? "on" : "off"}
</button>
    </div>
  );
}
