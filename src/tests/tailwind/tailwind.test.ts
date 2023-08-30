import {
  CoreSdConfig,
  SemanticDarkSdConfig,
  SemanticDesktopSdConfig,
  SemanticLightSdConfig,
  SemanticMobileSdConfig,
  TailWindSdConfig,
} from '../../generators/tailwind';

describe('Tailwind Exports', () => {
  it('Should generate Core CSS variables properly', () => {
    const sdExport = CoreSdConfig.exportPlatform('core_css');
    expect(sdExport).toMatchSnapshot();
  });
  it('Should generate Light Theme Semantic CSS variables properly', () => {
    const sdExport = SemanticLightSdConfig.exportPlatform('semantic_light');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate Dark Theme Semantic CSS variables properly', () => {
    const sdExport = SemanticDarkSdConfig.exportPlatform('semantic_dark');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate Mobile Semantic CSS variables properly', () => {
    const sdExport = SemanticMobileSdConfig.exportPlatform('semantic_mobile');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate Desktop Semantic CSS variables properly', () => {
    const sdExport = SemanticDesktopSdConfig.exportPlatform('semantic_desktop');
    expect(sdExport).toMatchSnapshot();
  });

  it('Should generate Tailwind Theme Config properly', () => {
    const sdExport = TailWindSdConfig.exportPlatform('tailwind');
    expect(sdExport).toMatchSnapshot();
  });
});
