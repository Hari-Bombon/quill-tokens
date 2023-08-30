import { Action, Named } from 'style-dictionary';
import * as fs from 'fs';

export const makeStylesAction: Named<Action> = {
  name: 'deriv/tw/make-style',
  do: (dictionary, config) => {
    const hasCore = config?.files?.[0]?.options?.useCoreVariables || false;
    const files = ['_dark.css', '_mobile.css', '_desktop.css', '_light.css'];
    let result = hasCore ? `@import "./_core.css";\n` : '';

    files.forEach((fileItem) => {
      result += `@import "./${fileItem}";\n`;
    });
    fs.writeFileSync('dist/tailwind/styles.css', result);
  },
};
