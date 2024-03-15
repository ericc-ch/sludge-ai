import path from "node:path";

export const FOLDER_PUBLIC = path.join(process.cwd(), "public");
export const DOWNLOAD_PATH = path.join(FOLDER_PUBLIC, "images");

const FILE_AUDIO = `script.mp3`;
const FILE_SUB_VTT = `script.vtt`;
const FILE_SUB_JSON = `script.json`;
const FILE_IMAGES_JSON = `images.json`;

export const PATH_AUDIO = path.join(FOLDER_PUBLIC, FILE_AUDIO);
export const PATH_SUB_VTT = path.join(FOLDER_PUBLIC, FILE_SUB_VTT);
export const PATH_SUB_JSON = path.join(FOLDER_PUBLIC, FILE_SUB_JSON);
export const PATH_IMAGES_JSON = path.join(FOLDER_PUBLIC, FILE_IMAGES_JSON);
