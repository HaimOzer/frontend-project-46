import * as fs from 'node:fs'
import path from 'node:path'

function getAbsolutePath(filePath) {
	return path.resolve(process.cwd(), filePath)
}

function parseFile(filePath) {
	try {
		// get absolute path
		const absolutePath = getAbsolutePath(filePath)

		// read file with function [fs.readFile]
		const fileContent = fs.readFileSync(absolutePath, 'utf-8')

		// define the file format
		const fileExtension = path.extname(absolutePath)

		if (fileExtension === '.json') {
			return JSON.parse(fileContent)
		} else {
			throw new Error('Unsupported file format')
		}
	} catch (error) {
		console.error(`Error parsing file ${filePath}: ${error.message}`)
		process.exit(1) // exit and get error's code
	}
}

export default parseFile
