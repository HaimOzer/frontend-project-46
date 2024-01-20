/**
 * Generates a report highlighting the differences between two sets of data.
 *
 * @param {string} file1 - The path to the first file.
 * @param {string} file2 - The path to the second file.
 * @param {string} [format='stylish'] - The format in which to display the differences ('stylish', 'plain', or 'json').
 * @returns {string} A formatted string representing the differences between the two files.
 */

import parse from './parsers.js';
import getContentFile from './getContentFile.js';
import makeReport from './makeReport.js';
import getExtension from './getExtension.js';
import formatSelector from './formatters/index.js';

function genDiff(file1, file2, format = 'stylish') {
	const contentFile1 = getContentFile(file1);
	const contentFile2 = getContentFile(file2);
	const parsedFile1 = parse(contentFile1, getExtension(file1));
	const parsedFile2 = parse(contentFile2, getExtension(file2));
	const diffStructure = makeReport(parsedFile1, parsedFile2);
	const result = formatSelector(diffStructure, format);
	return result;
}
export default genDiff
