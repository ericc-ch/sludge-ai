import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  Series,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { SUBTITLES } from "./assets/subtitles";
import { Text } from "./components/Text";
import { msToFrames } from "./lib/time";

const IMAGES = [
  { from: 1200, to: 8000, search: "Vatican City" },
  { from: 8001, to: 13000, search: "Pacific Ocean" },
  { from: 13001, to: 17000, search: "Lake Baikal" },
  { from: 17001, to: 22000, search: "Nile River" },
];

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
            {console.log(
              `${sub.text} from: ${msToFrames(sub.from) / 30} to: ${
                msToFrames(sub.to) / 30
              }`
            )}
            <AbsoluteFill>
              <Text style={{ fontSize: 100 }}>{sub.text}</Text>
            </AbsoluteFill>
          </Series.Sequence>
        ))}
      </Series>

      <Series>
        {IMAGES.map((sub, index) => (
          <Series.Sequence
            key={index}
            durationInFrames={msToFrames(sub.to - sub.from)}
            offset={index === 0 ? IMAGES[0].from : 0}
          >
            <AbsoluteFill>
              <Text style={{ position: "absolute", fontSize: 100, bottom: 0 }}>
                {sub.search}
              </Text>
            </AbsoluteFill>
          </Series.Sequence>
        ))}
      </Series>

      <Audio volume={1} src={staticFile("script.mp3")} />
    </AbsoluteFill>
  );
};
