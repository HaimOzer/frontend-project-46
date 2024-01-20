/**
 * Parses the given data based on the specified format.
 *
 * @param {string} data - The data to be parsed.
 * @param {string} format - The format of the data ('json', 'yml', or 'yaml').
 * @returns {Object} The parsed JavaScript object.
 * @throws {Error} If the specified format is not supported.
 */

import yaml from 'js-yaml';

const parse = (data, format) => {
	switch (format) {
		case 'json':
			return JSON.parse(data);
		case 'yml':
		case 'yaml':
			return yaml.load(data);
		default:
			throw new Error(`Unknown type! Type ${format} is not supported!`);
	}
};

export default parse
