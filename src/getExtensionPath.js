/**
 * Gets the file extension from a given path.
 *
 * @param {string} data - The path from which to extract the file extension.
 * @returns {string} The file extension without the leading dot.
 */

import path from 'path'

const getExtensionPath = data => path.extname(data).replace('.', '')

export default getExtensionPath
