import child from "child_process";
import fs from "fs/promises";
import path from "path";
import vtt from "@plussub/srt-vtt-parser";
import util from "util";

const exec = util.promisify(child.exec);

const voice = `en-US-AvaNeural`;
const script = `When a jellyfish stings you, it lodges microscopic barbs into your skin. Their tentacles are armed with thousands of them, and they're each filled with venom. Now, even if you just lightly brush against them, the stingers will immediately embed into your skin and release their painful toxins. The sting can cause an immediate sharp pain and may turn swollen and itchy as the venom spreads.`;
const fileNameAudio = `script.mp3`;
const fileNameSubVTT = `script.vtt`;
const fileNameSubJSON = `script.json`;

const fileSubAudio = path.join(process.cwd(), `temp/${fileNameAudio}`);
const filePathSubVTT = path.join(process.cwd(), `temp/${fileNameSubVTT}`);
const filePathSubJSON = path.join(process.cwd(), `temp/${fileNameSubJSON}`);

await exec(
  `edge-tts -v ${voice} -t "${script}" --write-media ${fileSubAudio} --write-subtitles ${filePathSubVTT}`
);

const subtitleString = await fs
  .readFile(filePathSubVTT)
  .then((data) => data.toString());

const { entries } = vtt.parse(subtitleString);

const transformedSub = entries.map((entry) => ({
  ...entry,
  text: entry.text.replaceAll("\r", ""),
}));

await fs.writeFile(
  filePathSubJSON,
  JSON.stringify({ subtitles: transformedSub })
);
