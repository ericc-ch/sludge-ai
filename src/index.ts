import { input } from "@inquirer/prompts";
import { generateImages } from "./server/ai/generation/image-search";
import { generateStory } from "./server/ai/generation/story";
import { generateTitle } from "./server/ai/generation/title";
import {
  IMAGES_SCHEMA,
  Images,
  downloadImages,
  writeImagesJSON,
} from "./server/lib/image";
import { initializeFolders } from "./server/lib/init";
import { getSubtitlesJSON, writeSubtitlesJSON } from "./server/lib/subtitles";
import { textToSpeech } from "./server/lib/tts";

await initializeFolders();

const keyword = await input({ message: "Enter the story keyword:" });

const title = await generateTitle(keyword);
console.log(`Title: ${title}`);

const story = await generateStory(title);
console.log(`Story: ${story.slice(0, 200)}...`);

console.log(`Generating audio...`);
try {
  await textToSpeech(story);
  console.log(`Audio generated!`);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}

const subtitlesJSON = await getSubtitlesJSON();
const images = await generateImages(subtitlesJSON);

let parsedImages: Images = [];

try {
  parsedImages = IMAGES_SCHEMA.parse(JSON.parse(images));
  console.log(`Images: ${parsedImages.length}`);
} catch (error) {
  console.error(error);
}

await writeSubtitlesJSON(subtitlesJSON);
await writeImagesJSON(parsedImages);
await downloadImages(parsedImages);
