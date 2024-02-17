import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { DURATION_IN_FRAMES, FPS } from "./lib/constants";

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
