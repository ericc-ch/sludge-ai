import vtt from "@plussub/srt-vtt-parser";
import { PATH_SUB_VTT } from "../paths";

const getRawSubtitles = async () => {
  const file = Bun.file(PATH_SUB_VTT);
  return file.text();
};

export const getSubtitles = async () => {
  const subtitleString = await getRawSubtitles();

  const { entries } = vtt.parse(subtitleString);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const transformedSub = entries.map(({ id: _, ...entry }) => entry);

  return { subtitles: transformedSub };
};
