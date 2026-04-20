/**
 * CE.SDK Placeholders Editor Starterkit - React Entry Point
 *
 * Demonstrates the CE.SDK placeholder feature for design template creation.
 * Placeholders allow template creators to define editable regions that
 * adopters can fill with their own content.
 *
 * @see https://img.ly/docs/cesdk/starterkits/placeholders-editor/
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import type { Configuration } from '@cesdk/cesdk-js';

import App from './app/App';
import { resolveAssetPath } from './resolveAssetPath';

// ============================================================================
// Configuration
// ============================================================================

export const editorConfig: Configuration = {
  // Unique user identifier for analytics (customize for your app)
  userId: 'starterkit-placeholders-editor-user'

  // Local assets (uncomment and set path for self-hosted assets)
  // baseURL: `/assets/`,

  // License key (required for production)
  // license: 'YOUR_LICENSE_KEY',
};

export const SCENE_URL = resolveAssetPath('/example.scene');

// ============================================================================
// Initialize React Application
// ============================================================================

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <App config={editorConfig} sceneUrl={SCENE_URL} />
  </StrictMode>
);
