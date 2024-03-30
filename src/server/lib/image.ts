import path from "node:path";
import { ofetch } from "ofetch";
import { z } from "zod";
import { FOLDER_DOWNLOAD } from "../paths";
import type { ResponseSearch } from "../types";
import { chunk } from "./array";

export const IMAGES_SCHEMA = z.array(
  z.object({
    from: z.number(),
    to: z.number(),
    search: z.string(),
  })
);

export type Images = z.infer<typeof IMAGES_SCHEMA>;

const downloadImageFile = async (url: string, name: string) => {
  const filePath = path.join(FOLDER_DOWNLOAD, `${name}.jpg`);
  const response = await ofetch<Blob>(url);
  return Bun.write(filePath, response);
};

const getUniqueImage = (images: Images) =>
  Array.from(new Set(images.map(({ search }) => search)));

const fetchImage = async (search: string) => {
  console.log(`Fetching image: ${search}`);
  const searchParams = new URLSearchParams({
    query: search,
    // Pexels API uses snake_case
    // eslint-disable-next-line camelcase
    per_page: "1",
  });

  const res = await ofetch<ResponseSearch>(
    `https://api.pexels.com/v1/search?${searchParams.toString()}`,
    { headers: { Authorization: `${import.meta.env.API_KEY_PEXELS}` } }
  );

  const photoSrc = res.photos[0].src.large;
  return downloadImageFile(photoSrc, search);
};

export const fetchAllImages = async (images: Images) => {
  const chunks = chunk(getUniqueImage(images), 4);

  for (const chunk of chunks) {
    await Promise.all(chunk.map(fetchImage));
  }
};
