import { describe } from 'node:test';
import { CoreSdConfig } from '../..';

describe('Tailwind Exports', () => {
  it('Should generate core css variables properly', () => {
    const sdExport = CoreSdConfig.exportPlatform('core_css');
    expect(sdExport).toMatchSnapshot();
  });
});
