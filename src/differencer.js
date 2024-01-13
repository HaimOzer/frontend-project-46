import parse from './parsers.js'
import getContentFile from './getContentFile.js'
import makeReport from './makeReport.js'
import getExtensionPath from './getExtensionPath.js'

function genDiff(file1, file2) {
	const contentFile1 = getContentFile(file1)
	const contentFile2 = getContentFile(file2)
	const parsedFile1 = parse(contentFile1, getExtensionPath(file1))
	const parsedFile2 = parse(contentFile2, getExtensionPath(file2))
	const differenceNodes = makeReport(parsedFile1, parsedFile2)
	return differenceNodes
}
export default genDiff
