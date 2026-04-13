/**
 * CE.SDK Placeholders Editor - Main App Component
 *
 * Orchestrates the editor initialization and role switching.
 */

import { useCallback, useRef, useState } from 'react';
import CreativeEditor from '@cesdk/cesdk-js/react';
import type CreativeEditorSDK from '@cesdk/cesdk-js';
import type { Configuration } from '@cesdk/cesdk-js';

import {
  initPlaceholdersCreatorEditor,
  initPlaceholdersAdopterEditor
} from '../imgly';
import RoleSwitcher from './RoleSwitcher/RoleSwitcher';
import styles from './App.module.css';

// ============================================================================
// Types
// ============================================================================

type Role = 'Creator' | 'Adopter';

interface AppProps {
  config: Configuration;
  sceneUrl: string;
}

// ============================================================================
// App Component
// ============================================================================

export default function App({ config, sceneUrl }: AppProps) {
  const cesdkRef = useRef<CreativeEditorSDK | null>(null);
  const [role, setRole] = useState<Role>('Creator');
  const [editorKey, setEditorKey] = useState(0);

  const handleInit = useCallback(
    async (cesdk: CreativeEditorSDK) => {
      cesdkRef.current = cesdk;

      // Debug access (remove in production)
      (window as any).cesdk = cesdk;

      // Initialize with role-specific configuration
      // Each role uses a different config and runtime APIs
      if (role === 'Creator') {
        await initPlaceholdersCreatorEditor(cesdk);
      } else {
        await initPlaceholdersAdopterEditor(cesdk);
      }

      // Load scene from URL
      await cesdk.loadFromURL(sceneUrl);

      // Zoom auto-fit to page
      cesdk.actions.run('zoom.toPage', { autoFit: true });
    },
    [role, sceneUrl]
  );

  const handleRoleChange = useCallback((newRole: Role) => {
    // Update role and force re-render of editor
    setRole(newRole);
    setEditorKey((prev) => prev + 1);
  }, []);

  return (
    <div className={styles.app}>
      {/* highlight-role-switcher */}
      <RoleSwitcher value={role} onChange={handleRoleChange} />
      {/* highlight-role-switcher */}
      <div className={styles.editorWrapper}>
        <CreativeEditor
          key={editorKey}
          className={styles.editor}
          config={config}
          init={handleInit}
        />
      </div>
    </div>
  );
}
