/**
 * Sets the output format for a given data structure.
 *
 * @param {Object} data - The data structure to be formatted.
 * @param {string} format - The desired output format ('stylish', 'plain', or 'json').
 * @returns {string} The formatted representation of the data according to the specified format.
 * @throws {Error} Throws an error if the specified format is unknown.
 */

import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const formatSelector = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylishFormat(data);
    case 'plain':
      return plainFormat(data);
    case 'json':
      return jsonFormat(data);
    default:
      throw new Error('Unknown format type');
  }
};

export default formatSelector;
