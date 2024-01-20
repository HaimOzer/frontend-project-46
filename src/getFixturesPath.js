/**
 * Resolves the absolute path to a file within the '__fixtures__' directory.
 *
 * @param {string} file - The name of the file within the '__fixtures__' directory.
 * @returns {string} The absolute path to the specified file.
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturesPath = file =>
	path.resolve(__dirname, '..', '__fixtures__', file);

export default getFixturesPath
