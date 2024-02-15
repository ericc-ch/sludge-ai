import { SUBTITLES } from "../assets/subtitles";
import { msToSeconds } from "./time";

const DURATION_IN_MS = SUBTITLES.at(-1)?.to ?? 0;

export const FPS = 30;
export const DURATION_IN_FRAMES = (msToSeconds(DURATION_IN_MS) + 1) * FPS;
