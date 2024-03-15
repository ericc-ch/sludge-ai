import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";
import { SUBTITLES } from "./assets/subtitles";
import { Text } from "./components/Text";
import { msToFrames } from "./lib/time";

const IMAGES = [
  { from: 100, to: 4013, search: "man working late" },
  { from: 4025, to: 8188, search: "man and woman" },
  { from: 8200, to: 11613, search: "woman thinking" },
  { from: 11625, to: 14988, search: "maid" },
  { from: 15000, to: 18550, search: "woman in disguise" },
  { from: 18562, to: 22012, search: "maid" },
  { from: 22025, to: 24475, search: "maid cleaning" },
  { from: 24488, to: 27600, search: "office building" },
  { from: 27613, to: 30812, search: "maid cleaning" },
  { from: 30825, to: 33475, search: "office building" },
  { from: 33487, to: 37325, search: "man in office" },
  { from: 37688, to: 40763, search: "office door" },
  { from: 40775, to: 44938, search: "housekeeper" },
  { from: 44962, to: 48800, search: "surprised man" },
  { from: 48900, to: 51800, search: "man talking" },
  { from: 51812, to: 55975, search: "housekeeper" },
  { from: 56337, to: 59188, search: "maid cleaning desk" },
  { from: 59200, to: 62263, search: "man desk" },
  { from: 62275, to: 65312, search: "photo on desk" },
  { from: 65325, to: 68950, search: "woman in photo" },
  { from: 68963, to: 72862, search: "woman looking at photo" },
  { from: 72875, to: 75338, search: "woman jealous" },
  { from: 75350, to: 78050, search: "woman looking at photo" },
  { from: 78062, to: 81575, search: "gasp" },
  { from: 81588, to: 84725, search: "photo" },
  { from: 84737, to: 86700, search: "photo on desk" },
  { from: 86713, to: 91075, search: "woman relieved" },
  { from: 91088, to: 94838, search: "maid cleaning" },
  { from: 94850, to: 97938, search: "man and woman talking" },
  { from: 98300, to: 100825, search: "man laughing" },
  { from: 100838, to: 103450, search: "couple anniversary" },
  { from: 103812, to: 106013, search: "man and woman laughing" },
  { from: 106025, to: 108987, search: "couple laughing" },
  { from: 109125, to: 112425, search: "couple laughing" },
  { from: 112438, to: 114350, search: "maid" },
];

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
          src={staticFile("/bg-video/steep.mp4")}
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
