import fsPromises from "node:fs/promises";
import path from "node:path";
import { ofetch } from "ofetch";
import { DOWNLOAD_PATH } from "../paths";
import { ResponseSearch } from "../types";
import fs from "node:fs";

export const saveImage = async (url: string, name: string) => {
  const response = await ofetch<Blob>(url);
  const buffer = await response.arrayBuffer();

  return fsPromises.writeFile(
    path.join(DOWNLOAD_PATH, `${name}.jpg`),
    Buffer.from(buffer),
    "binary"
  );
};

interface Image {
  from: number;
  to: number;
  search: string;
}

export const downloadImages = async (images: Array<Image>) => {
  for (const { search } of images) {
    const searchParams = new URLSearchParams({
      query: search,
      per_page: "1",
    });

    const res = await ofetch<ResponseSearch>(
      `https://api.pexels.com/v1/search?${searchParams.toString()}`,
      { headers: { Authorization: `${import.meta.env.VITE_PEXELS_API_KEY}` } }
    );

    const photoSrc = res.photos[0].src.large;

    const fileExists = fs.existsSync(path.join(DOWNLOAD_PATH, `${search}.jpg`));

    if (fileExists) {
      console.log(`Skipping ${search}...`);
    } else {
      console.log(`Downloading ${search}...`);
      await saveImage(photoSrc, search);
    }
  }
};
