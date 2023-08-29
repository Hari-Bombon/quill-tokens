import StyleDictionary from "style-dictionary";
import { registerTransforms } from "@tokens-studio/sd-transforms";
import { RAW_SOURCE_FOLDER, SD_SOURCE_FOLDER } from "./src/utils";
import { makeSdTailwindConfig } from "sd-tailwindcss-transformer";

registerTransforms(StyleDictionary);

const TailWindSdConfig = StyleDictionary.extend(
  makeSdTailwindConfig({
    source: [RAW_SOURCE_FOLDER],
    buildPath: "dist/tailwind/",
    type: "all",
    // isVariables: true,
    tailwind: {
      content: "",
    },
    transforms: [
      "ts/descriptionToComment",
      "ts/size/px",
      "ts/opacity",
      "ts/size/lineheight",
      "ts/typography/fontWeight",
      "ts/resolveMath",
      "ts/size/css/letterspacing",
      "ts/typography/css/fontFamily",
      "ts/typography/css/shorthand",
      "ts/border/css/shorthand",
      "ts/shadow/css/shorthand",
      // "ts/color/css/hexrgba",
      "ts/color/modifiers",
      "attribute/cti",
      "name/cti/kebab",
    ],
  })
);

TailWindSdConfig.cleanAllPlatforms();
TailWindSdConfig.buildAllPlatforms();
const typeSet = new Set<string>();
StyleDictionary.registerFormat({
  name: "test",
  formatter: ({ dictionary, platform, options, file }) => {
    dictionary.allTokens.forEach((token, index) => {
      typeSet.add(token.type);
      // console.log(`${index} \t : ${JSON.stringify(token, null, 2)}`);
    });

    return JSON.stringify(dictionary.tokens, null, 2);
  },
});

const SdConfig = StyleDictionary.extend({
  source: [RAW_SOURCE_FOLDER],
  platforms: {
    js: {
      transformGroup: "tokens-studio",
      buildPath: "dist/js/",
      files: [
        {
          destination: "variables.js",
          format: "javascript/es6",
        },
      ],
    },
    css: {
      transforms: [
        "ts/descriptionToComment",
        "ts/size/px",
        "ts/opacity",
        "ts/size/lineheight",
        "ts/typography/fontWeight",
        "ts/resolveMath",
        "ts/size/css/letterspacing",
        "ts/typography/css/fontFamily",
        "ts/typography/css/shorthand",
        "ts/border/css/shorthand",
        "ts/shadow/css/shorthand",
        // "ts/color/css/hexrgba",
        // "ts/color/modifiers",
        "name/cti/kebab",
      ],
      buildPath: "dist/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
  },
});
SdConfig.cleanAllPlatforms();
SdConfig.buildAllPlatforms();
console.log(typeSet);
