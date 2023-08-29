import { camelCase } from "camel-case";
import { NestedObj } from "../types";
import { type TransformedToken } from "style-dictionary";

export const RAW_TOKENS_BASE_FOLDER = "raw-tokens";

export const RAW_SOURCE_FOLDER = `${RAW_TOKENS_BASE_FOLDER}/**/*.json`;
export const RAW_FOUNDATION_SOURCE_FOLDER = `${RAW_TOKENS_BASE_FOLDER}/Foundation/**/*.json`;
export const BASE_VARIANT_SOURCE_INCLUDES = [
  `${RAW_TOKENS_BASE_FOLDER}/Semantic/ViewPort/Mobile.json`,
  `${RAW_TOKENS_BASE_FOLDER}/Semantic/Color/Light.json`,
];

export const makeNestedObject = <T extends readonly string[]>(
  obj: NestedObj<{ [key: string]: any }>,
  keys: T,
  value: string
): void => {
  const lastIndex = keys.length - 1;
  for (let i = 0; i < lastIndex; ++i) {
    const key = camelCase(keys[i]);
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }

  // https://v2.tailwindcss.com/docs/upgrading-to-v2#update-default-theme-keys-to-default
  if (keys[lastIndex] === "DEFAULT") {
    obj[keys[lastIndex]] = value;
  } else {
    obj[camelCase(keys[lastIndex])] = value;
  }
};

export const getCleanTokenPath = (
  tokenItem: TransformedToken,
  excludes: string[]
) => {
  const cleanPath = tokenItem.path.filter((el) => !excludes.includes(el));
  return cleanPath;
};
