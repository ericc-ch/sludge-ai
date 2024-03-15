import fs from "node:fs";
import fsPromises from "node:fs/promises";
import { DOWNLOAD_PATH, FOLDER_PUBLIC } from "../paths";

const REQUIRED_FOLDERS = [FOLDER_PUBLIC, DOWNLOAD_PATH];

export const initializeFolders = async () => {
  for (const folder of REQUIRED_FOLDERS) {
    if (!fs.existsSync(folder)) {
      await fsPromises.mkdir(folder);
    }
  }
};
