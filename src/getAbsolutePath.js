import path from 'path';
/**
 * Resolves the absolute path of a given file or directory.
 *
 * @param {string} filepath - The relative path of the file or directory.
 * @returns {string} - The absolute path.
 */

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
export default getAbsolutePath;
