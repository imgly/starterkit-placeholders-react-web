/**
 * CE.SDK Placeholders Editor - Initialization Module
 *
 * This module demonstrates the CE.SDK placeholder feature for design editing:
 * - Enable placeholder creation for template designers (Creator role)
 * - Placeholder regions can be defined for images, text, and other elements
 * - Adopters can fill placeholders with their own content
 *
 * @see https://img.ly/docs/cesdk/js/features/placeholders/
 */

import CreativeEditorSDK from '@cesdk/cesdk-js';

import {
  BlurAssetSource,
  ColorPaletteAssetSource,
  CropPresetsAssetSource,
  DemoAssetSources,
  EffectsAssetSource,
  FiltersAssetSource,
  PagePresetsAssetSource,
  StickerAssetSource,
  TextComponentAssetSource,
  TypefaceAssetSource,
  TextAssetSource,
  VectorShapeAssetSource,
  UploadAssetSources
} from '@cesdk/cesdk-js/plugins';

import { AdvancedEditorConfig } from './config/advanced-design-editor/plugin';
import { DesignEditorConfig } from './config/design-editor/plugin';

// ============================================================================
// Creator Editor Initialization
// ============================================================================

/**
 * Initialize the CE.SDK Placeholders Editor for Creator role.
 *
 * Creator mode enables:
 * - Advanced design editor configuration with full editing control
 * - Dark theme for professional editing environment
 * - Placeholder creation features for defining template regions
 * - Inspector panel for detailed block properties
 *
 * @param cesdk - The CreativeEditorSDK instance to configure
 */
export async function initDesignCreatorEditor(cesdk: CreativeEditorSDK) {
  const { engine } = cesdk;

  // ============================================================================
  // Configuration Plugin (Advanced Design Editor)
  // ============================================================================

  await cesdk.addPlugin(new AdvancedEditorConfig());

  // ============================================================================
  // Theme Configuration (Runtime API)
  // ============================================================================

  cesdk.ui.setTheme('dark');

  // ============================================================================
  // Placeholder Feature
  // ============================================================================

  // Enable placeholder features for Creator role
  // This allows creating placeholder regions that adopters can fill
  cesdk.feature.enable('ly.img.placeholder*');

  // ============================================================================
  // Inspector Panel Configuration (Runtime API)
  // ============================================================================

  // Enable the inspector feature
  cesdk.feature.enable('ly.img.inspector');

  // Position the inspector panel on the right side
  cesdk.ui.setPanelPosition('//ly.img.panel/inspector', 'right');

  // Make the inspector panel docked (not floating)
  cesdk.ui.setPanelFloating('//ly.img.panel/inspector', false);

  // ============================================================================
  // Dock Settings (Runtime API)
  // ============================================================================

  engine.editor.setSetting('dock/iconSize', 'normal');
  engine.editor.setSetting('dock/hideLabels', true);

  // ============================================================================
  // Navigation Bar Configuration (Runtime API)
  // ============================================================================

  cesdk.ui.setComponentOrder({ in: 'ly.img.navigation.bar' }, [
    // Left section
    'ly.img.undoRedo.navigationBar',
    'ly.img.pageResize.navigationBar',

    // Center section
    'ly.img.spacer',
    'ly.img.title.navigationBar',
    'ly.img.spacer',

    // Right section
    'ly.img.zoom.navigationBar',
    {
      id: 'ly.img.actions.navigationBar',
      children: ['ly.img.export.navigationBar']
    }
  ]);

  // ============================================================================
  // Export Actions (Runtime API)
  // ============================================================================

  cesdk.actions.register('exportDesign', async (exportOptions) => {
    const { blobs, options } = await cesdk.utils.export(exportOptions);
    await cesdk.utils.downloadFile(blobs[0], options.mimeType);
  });

  // ============================================================================
  // Upload Actions (Runtime API)
  // ============================================================================

  cesdk.actions.register('uploadFile', (file, onProgress, context) => {
    return cesdk.utils.localUpload(file, context);
  });

  // ============================================================================
  // Asset Source Plugins
  // ============================================================================

  await cesdk.addPlugin(new BlurAssetSource());
  await cesdk.addPlugin(new ColorPaletteAssetSource());
  await cesdk.addPlugin(new CropPresetsAssetSource());

  await cesdk.addPlugin(
    new UploadAssetSources({
      include: ['ly.img.image.upload']
    })
  );

  await cesdk.addPlugin(
    new DemoAssetSources({
      include: ['ly.img.image.*']
    })
  );

  await cesdk.addPlugin(new EffectsAssetSource());
  await cesdk.addPlugin(new FiltersAssetSource());

  await cesdk.addPlugin(
    new PagePresetsAssetSource({
      include: [
        'ly.img.page.presets.instagram.*',
        'ly.img.page.presets.facebook.*',
        'ly.img.page.presets.x.*',
        'ly.img.page.presets.linkedin.*',
        'ly.img.page.presets.pinterest.*',
        'ly.img.page.presets.tiktok.*',
        'ly.img.page.presets.youtube.*',
        'ly.img.page.presets.din.*',
        'ly.img.page.presets.us.*'
      ]
    })
  );

  await cesdk.addPlugin(new StickerAssetSource());
  await cesdk.addPlugin(new TextAssetSource());
  await cesdk.addPlugin(new TextComponentAssetSource());
  await cesdk.addPlugin(new TypefaceAssetSource());
  await cesdk.addPlugin(new VectorShapeAssetSource());

  // ============================================================================
  // Localization
  // ============================================================================

  cesdk.i18n.setTranslations({
    en: { 'actions.export.design': 'Export Design' }
  });

  cesdk.engine.editor.setRole('Creator');
}

// ============================================================================
// Adopter Editor Initialization
// ============================================================================

/**
 * Initialize the CE.SDK Placeholders Editor for Adopter role.
 *
 * Adopter mode enables:
 * - Standard design editor configuration with simplified interface
 * - Light theme for content editing environment
 * - Placeholder content filling (placeholders created by Creator)
 *
 * @param cesdk - The CreativeEditorSDK instance to configure
 */
export async function initDesignAdopterEditor(cesdk: CreativeEditorSDK) {
  // ============================================================================
  // Configuration Plugin (Design Editor)
  // ============================================================================

  await cesdk.addPlugin(new DesignEditorConfig());

  // ============================================================================
  // Theme Configuration (Runtime API)
  // ============================================================================

  cesdk.ui.setTheme('light');

  // ============================================================================
  // Navigation Bar Configuration (Runtime API)
  // ============================================================================

  cesdk.ui.setComponentOrder({ in: 'ly.img.navigation.bar' }, [
    // Left section
    'ly.img.undoRedo.navigationBar',
    'ly.img.pageResize.navigationBar',

    // Center section
    'ly.img.spacer',
    'ly.img.title.navigationBar',
    'ly.img.spacer',

    // Right section
    'ly.img.zoom.navigationBar',
    {
      id: 'ly.img.actions.navigationBar',
      children: ['ly.img.export.navigationBar']
    }
  ]);

  // ============================================================================
  // Export Actions (Runtime API)
  // ============================================================================

  cesdk.actions.register('exportDesign', async (exportOptions) => {
    const { blobs, options } = await cesdk.utils.export(exportOptions);
    await cesdk.utils.downloadFile(blobs[0], options.mimeType);
  });

  // ============================================================================
  // Upload Actions (Runtime API)
  // ============================================================================

  cesdk.actions.register('uploadFile', (file, onProgress, context) => {
    return cesdk.utils.localUpload(file, context);
  });

  // ============================================================================
  // Asset Source Plugins
  // ============================================================================

  await cesdk.addPlugin(new BlurAssetSource());
  await cesdk.addPlugin(new ColorPaletteAssetSource());
  await cesdk.addPlugin(new CropPresetsAssetSource());

  await cesdk.addPlugin(
    new UploadAssetSources({
      include: ['ly.img.image.upload']
    })
  );

  await cesdk.addPlugin(
    new DemoAssetSources({
      include: ['ly.img.image.*']
    })
  );

  await cesdk.addPlugin(new EffectsAssetSource());
  await cesdk.addPlugin(new FiltersAssetSource());

  await cesdk.addPlugin(
    new PagePresetsAssetSource({
      include: [
        'ly.img.page.presets.instagram.*',
        'ly.img.page.presets.facebook.*',
        'ly.img.page.presets.x.*',
        'ly.img.page.presets.linkedin.*',
        'ly.img.page.presets.pinterest.*',
        'ly.img.page.presets.tiktok.*',
        'ly.img.page.presets.youtube.*',
        'ly.img.page.presets.din.*',
        'ly.img.page.presets.us.*'
      ]
    })
  );

  await cesdk.addPlugin(new StickerAssetSource());
  await cesdk.addPlugin(new TextAssetSource());
  await cesdk.addPlugin(new TextComponentAssetSource());
  await cesdk.addPlugin(new TypefaceAssetSource());
  await cesdk.addPlugin(new VectorShapeAssetSource());

  // ============================================================================
  // Localization
  // ============================================================================

  cesdk.i18n.setTranslations({
    en: { 'actions.export.design': 'Export Design' }
  });

  cesdk.engine.editor.setRole('Adopter');
}
