import StyleDictionary, { FileHeader, formatHelpers } from "style-dictionary";
import {
  registerTransforms,
  transforms as TokenStudioTransforms,
} from "@tokens-studio/sd-transforms";
import {
  BASE_VARIANT_SOURCE_INCLUDES,
  RAW_FOUNDATION_SOURCE_FOLDER,
  RAW_TOKENS_BASE_FOLDER,
} from "./src/utils";
import TailwindFormatter from "./src/formatters/tailwind.formatter";
import {
  paragraphSpacingTransformer,
  spacingNameTransformer,
  tailwindTransforms,
  tokenPathTransformer,
} from "./src/transformers/tailwind.transformers";
import fs from "fs";

registerTransforms(StyleDictionary);

StyleDictionary.registerTransform(paragraphSpacingTransformer);
StyleDictionary.registerTransform(spacingNameTransformer);
StyleDictionary.registerTransform(tokenPathTransformer);
StyleDictionary.registerFormat(TailwindFormatter);

StyleDictionary.registerAction({
  name: "deriv/tw/make-style",
  do: (dictionary, config) => {
    const hasCore = config?.files?.[0]?.options?.useCoreVariables || false;
    const files = ["_dark.css", "_mobile.css", "_desktop.css", "_light.css"];
    let result = hasCore ? `@import "./_core.css";\n` : "";

    files.forEach((fileItem) => {
      result += `@import "./${fileItem}";\n`;
    });
    fs.writeFileSync("dist/tailwind/styles.css", result);
  },
});

StyleDictionary.registerFormat({
  name: "css/target-desktop",
  formatter: function ({ dictionary, file, options }) {
    const { outputReferences } = options;
    return (
      `@media screen and (min-width: 600px) { :root {\n` +
      formatHelpers.formattedVariables({
        format: "css",
        dictionary,
        outputReferences,
      }) +
      "\n}}\n"
    );
  },
});

const SemanticLightSdConfig = StyleDictionary.extend({
  source: [
    RAW_FOUNDATION_SOURCE_FOLDER,
    `${RAW_TOKENS_BASE_FOLDER}/Semantic/Color/Light.json`,
  ],
  platforms: {
    light: {
      transforms: [
        ...TokenStudioTransforms,
        "deriv/paragraph-spacing",
        "name/cti/kebab",
      ],
      buildPath: "dist/tailwind/",
      files: [
        {
          destination: "_light.css",
          format: "css/variables",
          filter: (token) => token.path.includes("semantic"),
          options: {
            selector: "html",
            outputReferences: false,
          },
        },
      ],
    },
  },
});

SemanticLightSdConfig.buildAllPlatforms();

const SemanticDarkSdConfig = StyleDictionary.extend({
  source: [
    RAW_FOUNDATION_SOURCE_FOLDER,
    `${RAW_TOKENS_BASE_FOLDER}/Semantic/Color/Dark.json`,
  ],
  platforms: {
    light: {
      transforms: [
        ...TokenStudioTransforms,
        "deriv/paragraph-spacing",
        "name/cti/kebab",
      ],
      buildPath: "dist/tailwind/",
      files: [
        {
          destination: "_dark.css",
          format: "css/variables",
          filter: (token) => token.path.includes("semantic"),
          options: {
            selector: "html.dark",
            outputReferences: false,
          },
        },
      ],
    },
  },
});

const CoreSdConfig = StyleDictionary.extend({
  source: [RAW_FOUNDATION_SOURCE_FOLDER],
  platforms: {
    light: {
      transforms: [
        ...TokenStudioTransforms,
        "deriv/paragraph-spacing",
        "name/cti/kebab",
      ],
      buildPath: "dist/tailwind/",
      files: [
        {
          destination: "_core.css",
          format: "css/variables",
          options: {
            outputReferences: false,
          },
        },
      ],
    },
  },
});

CoreSdConfig.buildAllPlatforms();

const SemanticMobileSdConfig = StyleDictionary.extend({
  source: [
    RAW_FOUNDATION_SOURCE_FOLDER,
    `${RAW_TOKENS_BASE_FOLDER}/Semantic/ViewPort/Mobile.json`,
  ],
  platforms: {
    light: {
      transforms: [
        ...TokenStudioTransforms,
        "deriv/paragraph-spacing",
        "name/cti/kebab",
      ],
      buildPath: "dist/tailwind/",
      files: [
        {
          destination: "_mobile.css",
          format: "css/variables",
          filter: (token) => token.path.includes("semantic"),
          options: {
            selector: ":root",
            outputReferences: false,
          },
        },
      ],
    },
  },
});

SemanticMobileSdConfig.buildAllPlatforms();

const SemanticDesktopSdConfig = StyleDictionary.extend({
  source: [
    RAW_FOUNDATION_SOURCE_FOLDER,
    `${RAW_TOKENS_BASE_FOLDER}/Semantic/ViewPort/Desktop.json`,
  ],
  platforms: {
    light: {
      transforms: [
        ...TokenStudioTransforms,
        "deriv/paragraph-spacing",
        "name/cti/kebab",
      ],
      buildPath: "dist/tailwind/",
      files: [
        {
          destination: "_desktop.css",
          // format: "css/variables",
          format: "css/target-desktop",
          filter: (token) => token.path.includes("semantic"),
          options: {
            // selector: ":root",
            outputReferences: false,
          },
        },
      ],
    },
  },
});

SemanticDesktopSdConfig.buildAllPlatforms();

SemanticDarkSdConfig.buildAllPlatforms();

const TailWindSdConfig = StyleDictionary.extend({
  source: [RAW_FOUNDATION_SOURCE_FOLDER],
  include: [...BASE_VARIANT_SOURCE_INCLUDES],
  platforms: {
    tailwind: {
      actions: ["deriv/tw/make-style"],
      transforms: [
        ...TokenStudioTransforms,
        ...tailwindTransforms,
        "name/cti/kebab",
      ],
      buildPath: "dist/tailwind/",
      files: [
        {
          destination: "tailwind.config.js",
          format: "deriv/tailwind-formatter",
          options: {
            useCoreVariables: false,
          },
        },
      ],
    },
  },
});

TailWindSdConfig.buildAllPlatforms();
