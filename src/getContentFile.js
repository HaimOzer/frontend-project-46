/**
 * Reads the content of a file located within the '__fixtures__' directory.
 *
 * @param {string} file - The name of the file to read.
 * @returns {string} The content of the specified file.
 */

import fs from 'fs';
import getAbsolutePath from './getAbsolutePath.js';

const getContentFile = (file) => {
  const filepath = getAbsolutePath(file);
  const fileContent = fs.readFileSync(filepath, { encoding: 'utf8' });
  return fileContent;
};
export default getContentFile;
