import { Format, Formatter, Named, TransformedToken } from "style-dictionary";
import { QuillTokenType } from "../types";
import { template as LodashTemplate } from "lodash";
import fs from "fs";
import * as prettier from "@prettier/sync";
import { makeNestedObject } from "../utils";

const tailwindTemplateFile = fs
  .readFileSync("src/templates/tailwind.template")
  .toString();

const tailwindTemplate = LodashTemplate(tailwindTemplateFile);

const tokenMap: Map<QuillTokenType, TransformedToken[]> = new Map([]);

const getTokens = (tokenType: QuillTokenType): TransformedToken[] => {
  return tokenMap.get(tokenType) || [];
};

const fooFormat = (tokens: TransformedToken[]) => {
  // this is a temp measure, please use transforms for these
  const allTokenObj = tokens.reduce<Record<string, string>>((acc, cur) => {
    acc[cur?.attributes?.tokenPath.join("-")] = cur.value;
    return acc;
  }, {});

  return JSON.stringify(allTokenObj, null, 2);
};

const formatObjectTokens = (tokens: TransformedToken[]) => {
  const allTokenObj = tokens.reduce<Record<string, string>>((acc, cur) => {
    acc[cur?.attributes?.tokenPath.join(".")] = cur.value;
    return acc;
  }, {});

  const result = {};
  Object.keys(allTokenObj).forEach((key) => {
    const keys = key.split(".");
    makeNestedObject(result, keys, allTokenObj[key]);
  });

  return JSON.stringify(result, null, 2);
};

const formatter: Formatter = ({ dictionary, file, options, platform }) => {
  const shouldUseCoreVariables = options?.useCoreVariables || false;
  dictionary.allTokens.forEach((token) => {
    if (token.path.includes("semantic") || shouldUseCoreVariables) {
      token["value"] = `var(--${token.name})`;
    }
  });

  dictionary.allTokens.forEach((token) => {
    const tokenType = token.type as QuillTokenType;
    const currentTokens = tokenMap.get(tokenType) || [];
    tokenMap.set(tokenType, [...currentTokens, token]);
  });

  const colorTokens = formatObjectTokens(getTokens("color"));

  const fontFamilyTokens = formatObjectTokens(getTokens("fontFamilies"));

  const spacingTokens = fooFormat([
    ...getTokens("spacing"),
    ...getTokens("paragraphSpacing"),
  ]);

  const borderRadiusTokens = fooFormat(getTokens("borderRadius"));

  const borderWidthTokens = fooFormat(getTokens("borderWidth"));

  const boxShadowTokens = fooFormat(getTokens("boxShadow"));

  const opacityTokens = fooFormat(getTokens("opacity"));

  const fontSizeTokens = fooFormat(getTokens("fontSizes"));

  const fontWeightTokens = fooFormat(getTokens("fontWeights"));

  const lineHeightTokens = fooFormat(getTokens("lineHeights"));

  const result = tailwindTemplate({
    colors: colorTokens,
    fontFamily: fontFamilyTokens,
    spacing: spacingTokens,
    borderRadius: borderRadiusTokens,
    borderWidth: borderWidthTokens,
    boxShadow: boxShadowTokens,
    opacity: opacityTokens,
    fontSize: fontSizeTokens,
    fontWeight: fontWeightTokens,
    lineHeight: lineHeightTokens,
    darkMode: "class",
  });

  return prettier.format(result, {
    parser: "typescript",
  });
};

const TailwindFormatter: Named<Format> = {
  name: "deriv/tailwind-formatter",
  formatter,
};

export default TailwindFormatter;
