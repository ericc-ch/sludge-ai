import vtt from "@plussub/srt-vtt-parser";
import fsPromises from "node:fs/promises";
import child from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import util from "node:util";

const exec = util.promisify(child.exec);

const FOLDER_PUBLIC = path.join(process.cwd(), "public");

const REQUIRED_FOLDERS = [FOLDER_PUBLIC, FOLDER_PUBLIC];

for (const folder of REQUIRED_FOLDERS) {
  if (!fs.existsSync(folder)) {
    await fsPromises.mkdir(folder);
  }
}

const removeNewLines = (str: string) => {
  return str.replace(/\r\n|\n|\r/g, " ");
};

const SCRIPT = removeNewLines(`Geography facts you don't know. The world's smallest country is Vatican City, which is only 0.44 square kilometers. The largest ocean in the world is the Pacific Ocean, which covers about 60% of the Earth's surface. The deepest lake in the world is Lake Baikal, which is over 1,600 meters deep. The longest river in the world is the Nile River, which is over 6,600 kilometers long.`);

const VOICE = `en-US-AvaNeural`;

const FILE_AUDIO = `script.mp3`;
const FILE_SUB_VTT = `script.vtt`;
const FILE_SUB_JSON = `script.json`;

const PATH_AUDIO = path.join(FOLDER_PUBLIC, FILE_AUDIO);
const PATH_SUB_VTT = path.join(FOLDER_PUBLIC, FILE_SUB_VTT);
const PATH_SUB_JSON = path.join(FOLDER_PUBLIC, FILE_SUB_JSON);

try {
  await exec(
    `edge-tts -v ${VOICE} -t "${SCRIPT}" --write-media ${PATH_AUDIO} --write-subtitles ${PATH_SUB_VTT}`
  );
} catch (error) {
  console.log(error);
}

console.log("Done. Saving subtitles...");

const subtitleString = await fsPromises
  .readFile(PATH_SUB_VTT)
  .then((data) => data.toString());

const { entries } = vtt.parse(subtitleString);

const transformedSub = entries.map(({ id, ...entry }) => {
  return {
    ...entry,
    text: entry.text.replaceAll("\r", ""),
  };
});

await fsPromises.writeFile(
  PATH_SUB_JSON,
  JSON.stringify({ subtitles: transformedSub })
);
