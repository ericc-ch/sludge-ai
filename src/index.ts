import child from "child_process";
import fsPromises from "fsPromises";
import fs from "fs";
import path from "path";
import vtt from "@plussub/srt-vtt-parser";
import util from "util";

const exec = util.promisify(child.exec);

const FOLDER_TEMP = path.join(process.cwd(), "temp");
const FOLDER_PUBLIC = path.join(process.cwd(), "public");

const REQUIRED_FOLDERS = [FOLDER_TEMP, FOLDER_PUBLIC];

for (const folder of REQUIRED_FOLDERS) {
  if (!fs.existsSync(folder)) {
    await fsPromises.mkdir(folder);
  }
}

const VOICE = `en-US-AvaNeural`;
const SCRIPT = `When a jellyfish stings you, it lodges microscopic barbs into your skin. Their tentacles are armed with thousands of them, and they're each filled with venom. Now, even if you just lightly brush against them, the stingers will immediately embed into your skin and release their painful toxins. The sting can cause an immediate sharp pain and may turn swollen and itchy as the venom spreads.`;
const FILE_AUDIO = `script.mp3`;
const FILE_SUB_VTT = `script.vtt`;
const FILE_SUB_JSON = `script.json`;

const PATH_AUDIO = path.join(FOLDER_TEMP, FILE_AUDIO);
const PATH_SUB_VTT = path.join(FOLDER_TEMP, FILE_SUB_VTT);
const PATH_SUB_JSON = path.join(FOLDER_TEMP, FILE_SUB_JSON);

await exec(
  `edge-tts -v ${VOICE} -t "${SCRIPT}" --write-media ${PATH_AUDIO} --write-subtitles ${PATH_SUB_VTT}`
);

const subtitleString = await fsPromises
  .readFile(PATH_SUB_VTT)
  .then((data) => data.toString());

const { entries } = vtt.parse(subtitleString);

const transformedSub = entries.map((entry) => ({
  ...entry,
  text: entry.text.replaceAll("\r", ""),
}));

await fsPromises.writeFile(
  PATH_SUB_JSON,
  JSON.stringify({ subtitles: transformedSub })
);
