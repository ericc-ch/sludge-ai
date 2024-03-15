import { FPS } from "./constants";

// Not rounding here because it will be too inaccurate
export const msToFrames = (ms: number) => {
  return ms * (FPS / 1000);
};
