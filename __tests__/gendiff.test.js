import path, { dirname, format } from 'path'
import getFixturesPath from '../src/getFixturesPath.js'
import { fileURLToPath } from 'url'
import getExtension from '../src/getExtension.js'
import getContentFile from '../src/getContentFile.js'
import yaml from 'js-yaml'
import genDiff from '../src/getDifferents.js'
import formatSelector from '../src/formatters/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('getFixturesPath function', () => {
	test('correct path to __fixtures__ directory', () => {
		const expectedPath = path.resolve(
			__dirname,
			'..',
			'__fixtures__',
			'file1.json'
		)
		expect(getFixturesPath('file1.json')).toBe(expectedPath)
	})
})

describe('getExtension function', () => {
	test('correct extension of file', () => {
		expect(getExtension('file1.json')).toBe('json')
	})
})

describe('genDiff function', () => {
	const cases = ['json', 'yaml', 'yml']
	const expectedStylish = getContentFile('expectedStylishFormat.txt')
	const expectedPlain = getContentFile('expectedPlainFormat.txt')
	const expectedJSON = getContentFile('expectedJsonFormat.txt')

	test.each(cases)('correctly generates differences tree', extension => {
		const data1 = getFixturesPath(`file1.${extension}`)
		const data2 = getFixturesPath(`file2.${extension}`)

		const currentDefaultFormat = genDiff(data1, data2)
		const currentStylishFormat = genDiff(data1, data2, 'stylish')
		const currentPlainFormat = genDiff(data1, data2, 'plain')
		const currentJSONFormat = genDiff(data1, data2, 'json')

		expect(currentDefaultFormat).toEqual(expectedStylish)
		expect(currentStylishFormat).toEqual(expectedStylish)
		expect(currentPlainFormat).toEqual(expectedPlain)
		expect(currentJSONFormat).toEqual(expectedJSON)
	})

	test('should throw an error for unknown format type', () => {
		const data = getFixturesPath('file1.json')
		expect(() => formatSelector(data, 'stringify')).toThrow(
			'Unknown format type'
		)
	})
})
