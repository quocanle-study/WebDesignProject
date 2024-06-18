import config from './app.js';
import fs from 'fs';
import path from 'path';

/**
 * This is the entry point of the build which is defined in vite.config.js (build.rollupOptions.input)
 */
const VITE_BUILD_ENTRY_POINT = 'vite-build-entry.html';

let assets = { scripts: [], styles: [] };

/**
 * If the environment is production, read the manifest file and get the scripts and styles from it.
 * @note Add slash to the beginning of the file path to make it relative to the root directory
 *
 * @see https://vitejs.dev/guide/backend-integration
 */
if (config.env === 'production') {
    const manifest = JSON.parse(fs.readFileSync(path.resolve('dist/.vite/manifest.json'), 'utf-8'));

    const addAssets = function (item, isImportedItem = false) {
        assets.scripts.push({
            type: isImportedItem ? 'modulepreload' : 'module',
            path: '/' + item.file,
        });

        if (item.css) {
            item.css.forEach((file) => {
                assets.styles.push({
                    path: '/' + file,
                });
            });
        }

        if (item.imports) {
            item.imports.forEach((importedItem) => {
                addAssets(manifest[importedItem], true);
            });
        }
    };

    addAssets(manifest[VITE_BUILD_ENTRY_POINT]);
}

if (config.env === 'development') {
    assets.scripts.push({
        type: 'module',
        path: '/src/resources/scripts/main.js',
    });
}

export default assets;
