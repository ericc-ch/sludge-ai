import { confirm, input, select } from "@inquirer/prompts";
import fs from "node:fs/promises";
import {
  generateImages,
  generateStory,
  generateTitle,
} from "./server/ai/generation";
import { IMAGES_SCHEMA, fetchAllImages, type Images } from "./server/lib/image";
import { initializeFolders } from "./server/lib/init";
import { writeJSON } from "./server/lib/json";
import { getSubtitles } from "./server/lib/subtitles";
import { textToSpeech } from "./server/lib/tts";
import {
  FOLDER_BG_VIDEOS,
  PATH_CONFIG_JSON,
  PATH_IMAGES_JSON,
  PATH_SUB_JSON,
} from "./server/paths";

await initializeFolders();

const availableVideos = await fs.readdir(FOLDER_BG_VIDEOS);
const video = await select({
  message: "Select a background video",
  choices: availableVideos.map((video) => ({
    name: video,
    value: video,
  })),
});

const config = {
  video,
};

const keyword = await input({ message: "Enter the story keyword:" });

let title = "";
while (
  !title ||
  (await confirm({ message: "Regenerate title?", default: true }))
) {
  console.log(`Generating title...`);
  title = await generateTitle(keyword);
  console.log(`Title: ${title}`);
  console.log(`---`);
}

let story = "";

while (
  !story ||
  (await confirm({ message: "Regenerate story?", default: true }))
) {
  console.log(`Generating story...`);
  story = await generateStory(title);
  console.log(`Story: ${story}`);
  console.log(`---`);
}

console.log(`Generating audio...`);
try {
  await textToSpeech(story);
  console.log(`Audio generated!`);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}

const subtitles = await getSubtitles();
const images = await generateImages(JSON.stringify(subtitles));

let parsedImages: Images = [];

try {
  parsedImages = IMAGES_SCHEMA.parse(JSON.parse(images));
  console.log(`Images: ${parsedImages.length}`);
} catch (error) {
  console.error(error);
}

await writeJSON(PATH_SUB_JSON, subtitles);
await writeJSON(PATH_IMAGES_JSON, parsedImages);
await writeJSON(PATH_CONFIG_JSON, config);
await fetchAllImages(parsedImages);
