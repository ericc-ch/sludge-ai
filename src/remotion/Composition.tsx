import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { Text } from "./components/Text";

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
          src={staticFile("steep.mp4")}
        />
      </AbsoluteFill>

      <AbsoluteFill>
        <Text style={{ fontSize: 100 }}>Wow what's that bro</Text>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
