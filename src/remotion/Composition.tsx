import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Series,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { SUBTITLES } from "./assets/subtitles";
import { Text } from "./components/Text";
import { msToFrames } from "./lib/time";

export const MyComposition = () => {
  const frame = useCurrentFrame();

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
          src={staticFile("steep.mp4")}
        />
      </AbsoluteFill>

      <Series>
        {SUBTITLES.map((sub, index) => (
          <Series.Sequence
            key={index}
            durationInFrames={msToFrames(sub.to - sub.from)}
          >
            <AbsoluteFill>
              <Text style={{ fontSize: 100 }}>{sub.text}</Text>
            </AbsoluteFill>
          </Series.Sequence>
        ))}
      </Series>

      <Audio volume={1} src={staticFile("script.mp3")} />
    </AbsoluteFill>
  );
};
