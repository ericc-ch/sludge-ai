import { SUBTITLES } from "../assets/subtitles";

const DURATION_IN_MS = SUBTITLES.at(-1)?.to ?? 0;

export const FPS = 30;
export const DURATION_IN_FRAMES = (DURATION_IN_MS / 1000 + 1) * FPS;
