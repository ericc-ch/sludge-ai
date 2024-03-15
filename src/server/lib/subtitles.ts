import vtt from "@plussub/srt-vtt-parser";
import fsPromises from "node:fs/promises";
import { PATH_SUB_JSON, PATH_SUB_VTT } from "../paths";

const getRawSubtitles = async () => {
  const data = await fsPromises.readFile(PATH_SUB_VTT);
  return data.toString();
};

export const getSubtitlesJSON = async () => {
  const subtitleString = await getRawSubtitles();

  const { entries } = vtt.parse(subtitleString);

  const transformedSub = entries.map(({ id: _, ...entry }) => {
    return {
      ...entry,
      text: entry.text.replaceAll("\r", ""),
    };
  });

  return JSON.stringify({ subtitles: transformedSub });
};

export const writeSubtitlesJSON = (subtitlesJSON: string) => {
  return fsPromises.writeFile(PATH_SUB_JSON, subtitlesJSON);
};
