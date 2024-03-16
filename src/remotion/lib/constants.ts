import { SUBTITLES } from "../assets/json-files";

const DURATION_IN_MS = SUBTITLES.at(-1)?.to ?? 0;

export const FPS = 30;
export const DURATION_IN_FRAMES = Math.ceil(DURATION_IN_MS * (FPS / 1000));
