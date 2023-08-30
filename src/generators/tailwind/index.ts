import StyleDictionary from 'style-dictionary';
import { registerTransforms, transforms as TokenStudioTransforms } from '@tokens-studio/sd-transforms';
import { BASE_VARIANT_SOURCE_INCLUDES, RAW_FOUNDATION_SOURCE_FOLDER, RAW_TOKENS_BASE_FOLDER } from '../../utils';
import TailwindFormatter from '../../formatters/tailwind.formatter';
import {
  paragraphSpacingTransformer,
  spacingNameTransformer,
  tailwindTransforms,
  tokenPathTransformer,
} from '../../transformers/tailwind.transformers';
import { makeStylesAction } from '../../actions/tailwind.actions';
import { desktopTargetFormatter } from '../../formatters/desktop-target.formatter';

registerTransforms(StyleDictionary);

StyleDictionary.registerTransform(paragraphSpacingTransformer);
StyleDictionary.registerTransform(spacingNameTransformer);
StyleDictionary.registerTransform(tokenPathTransformer);
StyleDictionary.registerFormat(TailwindFormatter);
StyleDictionary.registerAction(makeStylesAction);
StyleDictionary.registerFormat(desktopTargetFormatter);

export const CoreSdConfig = StyleDictionary.extend({
  source: [RAW_FOUNDATION_SOURCE_FOLDER],
  platforms: {
    core_css: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: 'dist/tailwind/',
      files: [
        {
          destination: '_core.css',
          format: 'css/variables',
          options: {
            outputReferences: false,
          },
        },
      ],
    },
  },
});

export const SemanticLightSdConfig = StyleDictionary.extend({
  source: [RAW_FOUNDATION_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/Semantic/Color/Light.json`],
  platforms: {
    semantic_light: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: 'dist/tailwind/',
      files: [
        {
          destination: '_light.css',
          format: 'css/variables',
          filter: (token) => token.path.includes('semantic'),
          options: {
            selector: 'html',
            outputReferences: false,
          },
        },
      ],
    },
  },
});

export const SemanticDarkSdConfig = StyleDictionary.extend({
  source: [RAW_FOUNDATION_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/Semantic/Color/Dark.json`],
  platforms: {
    semantic_dark: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: 'dist/tailwind/',
      files: [
        {
          destination: '_dark.css',
          format: 'css/variables',
          filter: (token) => token.path.includes('semantic'),
          options: {
            selector: 'html.dark',
            outputReferences: false,
          },
        },
      ],
    },
  },
});

export const SemanticMobileSdConfig = StyleDictionary.extend({
  source: [RAW_FOUNDATION_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/Semantic/ViewPort/Mobile.json`],
  platforms: {
    semantic_mobile: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: 'dist/tailwind/',
      files: [
        {
          destination: '_mobile.css',
          format: 'css/variables',
          filter: (token) => token.path.includes('semantic') && token.type !== 'typography',
          options: {
            selector: ':root',
            outputReferences: false,
          },
        },
      ],
    },
  },
});

export const SemanticDesktopSdConfig = StyleDictionary.extend({
  source: [RAW_FOUNDATION_SOURCE_FOLDER, `${RAW_TOKENS_BASE_FOLDER}/Semantic/ViewPort/Desktop.json`],
  platforms: {
    semantic_desktop: {
      transforms: [...TokenStudioTransforms, 'deriv/paragraph-spacing', 'name/cti/kebab'],
      buildPath: 'dist/tailwind/',
      files: [
        {
          destination: '_desktop.css',
          format: 'css/target-desktop',
          filter: (token) => token.path.includes('semantic') && token.type !== 'typography',
          options: {
            outputReferences: false,
          },
        },
      ],
    },
  },
});

export const TailWindSdConfig = StyleDictionary.extend({
  source: [RAW_FOUNDATION_SOURCE_FOLDER],
  include: [...BASE_VARIANT_SOURCE_INCLUDES],
  platforms: {
    tailwind: {
      actions: ['deriv/tw/make-style'],
      transforms: [...TokenStudioTransforms, ...tailwindTransforms, 'name/cti/kebab'],
      buildPath: 'dist/tailwind/',
      files: [
        {
          destination: 'tailwind.config.js',
          format: 'deriv/tailwind-formatter',
          options: {
            useCoreVariables: false,
          },
        },
      ],
    },
  },
});
