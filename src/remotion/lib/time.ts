import { FPS } from "./constants";

export const msToSeconds = (ms: number) => {
  return Math.floor(ms / 1000);
};

export const msToFrames = (ms: number) => {
  return msToSeconds(ms) * FPS;
};
