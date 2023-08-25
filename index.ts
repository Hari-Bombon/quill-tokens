import StyleDictionary from "style-dictionary";
import { SD_SOURCE_FOLDER } from "./utils";

const SdConfig = StyleDictionary.extend({
  source: [SD_SOURCE_FOLDER],
  platforms: {
    scss: {
      transformGroup: "css",
      buildPath: "dist/css/",
      files: [
        {
          destination: "_variables.css",
          format: "css/variables",
        },
      ],
    },
  },
});

SdConfig.buildAllPlatforms();
