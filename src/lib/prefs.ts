import { useSyncExternalStore } from "react";

type Prefs = { night: boolean; sound: boolean };
let state: Prefs = { night: false, sound: false };
const subs = new Set<() => void>();

function apply() {
  if (typeof document !== "undefined") document.documentElement.classList.toggle("night", state.night);
}

export function initPrefs() {
  try {
    const night = localStorage.getItem("lumi-night") === "1";
    state = { ...state, night };
  } catch {}
  apply();
  subs.forEach((f) => f());
}

export function setPref<K extends keyof Prefs>(k: K, v: Prefs[K]) {
  state = { ...state, [k]: v };
  if (k === "night") try { localStorage.setItem("lumi-night", v ? "1" : "0"); } catch {}
  apply();
  subs.forEach((f) => f());
}

const server: Prefs = { night: false, sound: false };
export function usePrefs() {
  return useSyncExternalStore(
    (f) => (subs.add(f), () => subs.delete(f)),
    () => state,
    () => server,
  );
}
export const getPrefs = () => state;
