import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import SCRIPT from "@/temp/script.json";

const SUBTITLES = Array.from(SCRIPT.subtitles);

const msToSeconds = (ms: number) => {
  return Math.floor(ms / 1000);
};

const DURATION_IN_MS = SUBTITLES.at(-1)?.to ?? 0;

const FPS = 30;
const DURATION_IN_FRAMES = (msToSeconds(DURATION_IN_MS) + 1) * FPS;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Sludge"
        component={MyComposition}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
