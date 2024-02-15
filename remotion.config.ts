import { Config } from "@remotion/cli/config";
import os from "os";
import path from "path";

const CORES_PERCENTAGE = 80 / 100;
const CONCURRENCY = Math.round(CORES_PERCENTAGE * os.cpus().length);

Config.setVideoImageFormat("jpeg");
Config.setConcurrency(CONCURRENCY);
Config.overrideWebpackConfig((config) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
        "@": path.join(process.cwd()),
      },
    },
  };
});
