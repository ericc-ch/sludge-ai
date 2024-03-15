import { FPS } from "./constants";

export const msToFrames = (ms: number) => {
  return Math.floor(ms * (FPS / 1000));
};
