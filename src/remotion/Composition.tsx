import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";
import { CONFIG, IMAGES, SUBTITLES } from "./assets/json-files";
import { Text } from "./components/Text";
import { msToFrames } from "./lib/time";

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <OffthreadVideo
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          volume={1}
          startFrom={90}
          src={staticFile(`/bg-video/${CONFIG.video}`)}
        />
      </AbsoluteFill>

      {SUBTITLES.map((sub, index) => (
        <Sequence
          key={index}
          from={msToFrames(sub.from)}
          durationInFrames={msToFrames(sub.to - sub.from)}
        >
          <Text
            style={{
              fontSize: 100,
              textAlign: "center",
              paddingInline: 40,
              marginTop: 360,
            }}
          >
            {sub.text}
          </Text>
        </Sequence>
      ))}

      {IMAGES.map((sub, index) => (
        <Sequence
          key={index}
          from={msToFrames(sub.from)}
          durationInFrames={msToFrames(sub.to - sub.from)}
        >
          <Img
            src={staticFile(`/images/${sub.search}.jpg`)}
            style={{
              height: "600px",
              width: "800px",
              objectFit: "cover",
              objectPosition: "center",
              position: "absolute",
              bottom: 180,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </Sequence>
      ))}

      <Audio volume={1} src={staticFile("script.mp3")} />
    </AbsoluteFill>
  );
};
