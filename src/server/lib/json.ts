import type { Jsonifiable } from "type-fest";

export const writeJSON = (path: string, obj: Jsonifiable) => {
  return Bun.write(path, JSON.stringify(obj));
};
