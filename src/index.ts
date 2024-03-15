import vtt from "@plussub/srt-vtt-parser";
import fsPromises from "node:fs/promises";
import child from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import util from "node:util";
import { ofetch } from "ofetch";

const exec = util.promisify(child.exec);

const FOLDER_PUBLIC = path.join(process.cwd(), "public");
const DOWNLOAD_PATH = path.join(process.cwd(), "/public/images");

const REQUIRED_FOLDERS = [FOLDER_PUBLIC, FOLDER_PUBLIC, DOWNLOAD_PATH];

const downloadProfilePic = async (url: string, name: string) => {
  const response = await ofetch<Blob>(url);
  const buffer = await response.arrayBuffer();

  return fsPromises.writeFile(
    path.join(DOWNLOAD_PATH, `${name}.jpg`),
    Buffer.from(buffer),
    "binary"
  );
};

for (const folder of REQUIRED_FOLDERS) {
  if (!fs.existsSync(folder)) {
    await fsPromises.mkdir(folder);
  }
}

const sanitize = (str: string) => {
  return str.replace(/[\\"\r\n]/g, (match) => {
    switch (match) {
      case '"':
        return '\\"';
      case "\r":
      case "\n":
        return "\\n";
      default:
        return `\\${match}`;
    }
  });
};

const SCRIPT = sanitize(
  `My husband, Mark, had been acting strange lately. He was working late, coming home smelling of perfume, and avoiding eye contact. My gut told me something was wrong, but I couldn't bring myself to confront him. So, I hatched a plan. I would go undercover as a maid and infiltrate his office. I bought a cheap maid's uniform, complete with a mop and bucket, and set out to catch Mark in the act. I arrived at his office building early and slipped into the uniform. I then proceeded to clean the hallways, all the while keeping an eye out for Mark. After an hour of cleaning, I finally spotted him. He was in his office, with his door closed. I took a deep breath and knocked. "Housekeeping," I announced. Mark opened the door, and his eyes widened in surprise. "Uh, I don't need any cleaning today," he said. "I'm just about to leave." I smiled and said, "No problem, sir. I'll just finish up in here." I stepped into his office and began to tidy up his desk. As I did, I couldn't help but notice a framed photo of a woman on his desk. She was beautiful, with long dark hair and piercing blue eyes. I felt a pang of jealousy. Could this be the woman he was cheating on me with? I decided to take a closer look at the photo. As I leaned in, I gasped. It was me! I was the woman in the photo. Mark had framed a photo of me and put it on his desk. I was so relieved and embarrassed. I quickly finished cleaning up and left the office. I confronted Mark later that night and told him about my little adventure. He laughed and said he had been planning to surprise me with a framed photo of us for our anniversary. He had no idea I would go to such lengths to catch him "cheating." We both had a good laugh, and our relationship is stronger than ever. I guess you could say I cleaned up pretty well that day!`
);

const imagesString =
  '[{"from":100,"to":4013,"search":"man working late"},{"from":4025,"to":8188,"search":"man and woman"},{"from":8200,"to":11613,"search":"woman thinking"},{"from":11625,"to":14988,"search":"maid outfit"},{"from":15000,"to":18550,"search":"woman in disguise"},{"from":18562,"to":22012,"search":"maid"},{"from":22025,"to":24475,"search":"maid cleaning"},{"from":24488,"to":27600,"search":"office building"},{"from":27613,"to":30812,"search":"maid cleaning"},{"from":30825,"to":33475,"search":"office building"},{"from":33487,"to":37325,"search":"man in office"},{"from":37688,"to":40763,"search":"office door"},{"from":40775,"to":44938,"search":"housekeeper"},{"from":44962,"to":48800,"search":"surprised man"},{"from":48900,"to":51800,"search":"man talking"},{"from":51812,"to":55975,"search":"housekeeper"},{"from":56337,"to":59188,"search":"maid cleaning desk"},{"from":59200,"to":62263,"search":"man desk"},{"from":62275,"to":65312,"search":"photo on desk"},{"from":65325,"to":68950,"search":"woman in photo"},{"from":68963,"to":72862,"search":"woman looking at photo"},{"from":72875,"to":75338,"search":"woman jealous"},{"from":75350,"to":78050,"search":"woman looking at photo"},{"from":78062,"to":81575,"search":"gasp"},{"from":81588,"to":84725,"search":"photo"},{"from":84737,"to":86700,"search":"photo on desk"},{"from":86713,"to":91075,"search":"woman relieved"},{"from":91088,"to":94838,"search":"maid cleaning"},{"from":94850,"to":97938,"search":"man and woman talking"},{"from":98300,"to":100825,"search":"man laughing"},{"from":100838,"to":103450,"search":"couple anniversary"},{"from":103812,"to":106013,"search":"man and woman laughing"},{"from":106025,"to":108987,"search":"couple laughing"},{"from":109125,"to":112425,"search":"couple laughing"},{"from":112438,"to":114350,"search":"maid cleaning"}]';

const IMAGES = JSON.parse(imagesString) as Array<{
  from: number;
  to: number;
  search: string;
}>;

const VOICE = `en-US-AvaNeural`;

const FILE_AUDIO = `script.mp3`;
const FILE_SUB_VTT = `script.vtt`;
const FILE_SUB_JSON = `script.json`;

const PATH_AUDIO = path.join(FOLDER_PUBLIC, FILE_AUDIO);
const PATH_SUB_VTT = path.join(FOLDER_PUBLIC, FILE_SUB_VTT);
const PATH_SUB_JSON = path.join(FOLDER_PUBLIC, FILE_SUB_JSON);

console.log("Generating audio...");

try {
  await exec(
    `edge-tts -v ${VOICE} -t "${SCRIPT}" --write-media ${PATH_AUDIO} --write-subtitles ${PATH_SUB_VTT}`
  );
} catch (error) {
  console.log(error);
  process.exitCode = 1;
}

console.log("Done. Saving subtitles...");

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

for (const [index, { search }] of Object.entries(IMAGES)) {
  console.log(
    `(${parseInt(index, 10) + 1}/${IMAGES.length}) Searching for ${search}...`
  );

  const searchParams = new URLSearchParams({
    query: search,
    per_page: "1",
  });

  const res = await ofetch<PexelsAPIResponse>(
    `https://api.pexels.com/v1/search?${searchParams.toString()}`,
    {
      headers: {
        Authorization: `${import.meta.env.VITE_PEXELS_API_KEY}`,
      },
    }
  );

  const photoSrc = res.photos[0].src.large;

  const fileExists = fs.existsSync(path.join(DOWNLOAD_PATH, `${search}.jpg`));

  if (!fileExists) {
    console.log(`Downloading ${search}...`);
    await downloadProfilePic(photoSrc, search);
  } else {
    console.log(`Skipping ${search}...`);
  }
}

interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

interface PexelsAPIResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
  next_page: string;
}
