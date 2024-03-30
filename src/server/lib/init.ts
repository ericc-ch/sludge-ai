import fs from "node:fs";
import fsPromises from "node:fs/promises";
import { FOLDER_BG_VIDEOS, FOLDER_DOWNLOAD, FOLDER_PUBLIC } from "../paths";

const REQUIRED_FOLDERS = [FOLDER_PUBLIC, FOLDER_DOWNLOAD, FOLDER_BG_VIDEOS];

export const initializeFolders = async () => {
  for (const folder of REQUIRED_FOLDERS) {
    if (!fs.existsSync(folder)) {
      await fsPromises.mkdir(folder);
    }
  }
};
