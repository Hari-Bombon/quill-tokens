import { Action, Named } from 'style-dictionary';
import * as fs from 'fs';
import { QUILL_TAILWIND_BUILD_PATH } from '../utils';

export const makeStylesAction: Named<Action> = {
  name: 'deriv/tw/make-style',
  do: (dictionary, config) => {
    const hasCore = config?.files?.[0]?.options?.useCoreVariables || false;
    const files = ['_dark.css', '_mobile.css', '_desktop.css', '_light.css'];
    let result = hasCore ? `@import "./_core.css";\n` : '';

    files.forEach((fileItem) => {
      result += `@import "./${fileItem}";\n`;
    });
    fs.writeFileSync(`${QUILL_TAILWIND_BUILD_PATH}styles.css`, result);
  },
};
