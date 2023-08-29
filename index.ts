import StyleDictionary from "style-dictionary";
import { registerTransforms, transforms } from "@tokens-studio/sd-transforms";
import { RAW_FOUNDATION_SOURCE_FOLDER } from "./src/utils";
import TailwindFormatter from "./src/formatters/tailwind.formatter";
import {
  paragraphSpacingTransformer,
  spacingNameTransformer,
  tokenPathTransformer,
} from "./src/transformers/tailwind.transformers.index";

registerTransforms(StyleDictionary);

StyleDictionary.registerTransform(paragraphSpacingTransformer);
StyleDictionary.registerTransform(spacingNameTransformer);
StyleDictionary.registerTransform(tokenPathTransformer);

// StyleDictionary.registerTransform({
//   name: "deriv/paragraph-spacing",
//   type: "value",
//   matcher: (token) => token.type === "paragraphSpacing",
//   transformer: (token) => {
//     return `${token.value}px`;
//   },
// });
// StyleDictionary.registerTransform({
//   name: "deriv/spacing-name",
//   type: "name",
//   matcher: (token) => token.type === "spacing",
//   transformer: (token) => token.path.join("-"),
// });

StyleDictionary.registerFormat(TailwindFormatter);

const TailWindSdConfig = StyleDictionary.extend({
  source: [RAW_FOUNDATION_SOURCE_FOLDER],
  platforms: {
    tailwind: {
      // transformGroup: "tokens-studio",
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
        "ts/color/css/hexrgba",
        "ts/color/modifiers",
        "deriv/paragraph-spacing",
        "deriv/spacing-name",
        "deriv/token-path",
        "name/cti/kebab",
      ],
      buildPath: "dist/tailwind/",
      files: [
        {
          destination: "tailwind.config.js",
          format: "deriv/tailwind-formatter",
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
        "ts/color/css/hexrgba",
        "ts/color/modifiers",
        "deriv/paragraph-spacing",
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

TailWindSdConfig.buildAllPlatforms();
