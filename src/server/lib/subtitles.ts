import vtt from "@plussub/srt-vtt-parser";
import { PATH_SUB_JSON, PATH_SUB_VTT } from "../paths";

const getRawSubtitles = async () => {
  const file = Bun.file(PATH_SUB_VTT);
  return file.text();
};

export const getSubtitlesJSON = async () => {
  const subtitleString = await getRawSubtitles();

  const { entries } = vtt.parse(subtitleString);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const transformedSub = entries.map(({ id: _, ...entry }) => {
    return {
      ...entry,
      text: entry.text.replaceAll("\r", ""),
    };
  });

  return JSON.stringify({ subtitles: transformedSub });
};

export const writeSubtitlesJSON = (subtitlesJSON: string) => {
  return Bun.write(PATH_SUB_JSON, subtitlesJSON);
};
