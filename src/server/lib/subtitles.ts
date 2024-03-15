import vtt from "@plussub/srt-vtt-parser";
import fsPromises from "node:fs/promises";
import { PATH_SUB_JSON, PATH_SUB_VTT } from "../paths";

export const generateSubtitles = async () => {
  const subtitleString = await fsPromises
    .readFile(PATH_SUB_VTT)
    .then((data) => data.toString());

  const { entries } = vtt.parse(subtitleString);

  const transformedSub = entries.map(({ id: _, ...entry }) => {
    return {
      ...entry,
      text: entry.text.replaceAll("\r", ""),
    };
  });

  await fsPromises.writeFile(
    PATH_SUB_JSON,
    JSON.stringify({ subtitles: transformedSub })
  );
};
