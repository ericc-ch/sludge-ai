import vtt from "@plussub/srt-vtt-parser";
import child from "node:child_process";
import fs from "node:fs";
import fsPromises from "fs/promises";
import path from "node:path";
import util from "node:util";

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
const SCRIPT = `Fuck nooooo.Weird facts you don't know. 
A swarm of 20,000 bees followed a car for two days because their queen was stuck inside.
Rockados cannot stick their tongue out because it's attached to the roof of their mouths. 

If you tickle a rat day after day, it will start laughing whenever it sees you. 

In 2013, police and the Maldives arrested a coconut for lordering near a polling station for the presidential election.
Locals fear the coconut may have been ingrained with a black magic spell to influence the election. 

A Chinese farmer who always wanted to own his own plane built a full scale,
non-working replica of an airbus A320 out of 50 tons of steel. It took him and his friends over two years and costed over $400,000. 

When invited by a lady to spend a night with her, Benjamin Franklin asked to postpone until winter when nights were longer.`.replace(
  /\r\n|\n|\r/g,
  ""
);
const FILE_AUDIO = `script.mp3`;
const FILE_SUB_VTT = `script.vtt`;
const FILE_SUB_JSON = `script.json`;

const PATH_AUDIO = path.join(FOLDER_TEMP, FILE_AUDIO);
const PATH_SUB_VTT = path.join(FOLDER_TEMP, FILE_SUB_VTT);
const PATH_SUB_JSON = path.join(FOLDER_TEMP, FILE_SUB_JSON);

console.log({
  VOICE,
  PATH_AUDIO,
});

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

const transformedSub = entries.map((entry) => ({
  ...entry,
  text: entry.text.replaceAll("\r", ""),
}));

await fsPromises.writeFile(
  PATH_SUB_JSON,
  JSON.stringify({ subtitles: transformedSub })
);

console.log((await fsPromises.readFile(PATH_SUB_JSON)).toString());
