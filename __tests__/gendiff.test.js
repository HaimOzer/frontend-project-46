import path, { dirname, format } from 'path'
import getFixturesPath from '../src/getFixturesPath.js'
import { fileURLToPath } from 'url'
import getExtension from '../src/getExtension.js'
import getContentFile from '../src/getContentFile.js'
import parse from '../src/parsers.js'
import yaml from 'js-yaml'
import genDiff from '../src/getDifferents.js'
import stylishFormat from '../src/formatters/stylish.js'

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

describe('parse function', () => {
	test('should parse JSON data correctly', () => {
		const jsonData = '{"name": "John", "age": 25}'
		const parsedData = parse(jsonData, 'json')
		expect(parsedData).toEqual({ name: 'John', age: 25 })
	})

	test('should parse YAML data correctly', () => {
		const yamlData = 'name: John\nage: 25'
		const parsedData = parse(yamlData, 'yaml')
		expect(parsedData).toEqual({ name: 'John', age: 25 })
	})

	test('should parse YAML data correctly when format is "yml"', () => {
		const yamlData = 'name: John\nage: 25'
		const parsedData = parse(yamlData, 'yml')
		expect(parsedData).toEqual({ name: 'John', age: 25 })
	})

	test('should throw an error for unknown format', () => {
		const invalidFormat = 'csv'
		expect(() => parse('', invalidFormat)).toThrowError(
			`Unknown type! Type ${invalidFormat} is not supported!`
		)
	})
})

describe('stylishFormat function', () => {
	test('should format unchanged node correctly', () => {
		const tree = [{ type: 'unchanged', key: 'name', value: 'John' }]
		const result = stylishFormat(tree)
		expect(result).toEqual('{\n    name: John\n}')
	})

	test('should format added node correctly', () => {
		const tree = [{ type: 'added', key: 'name', value: 'John' }]
		const result = stylishFormat(tree)
		expect(result).toEqual('{\n  + name: John\n}')
	})

	test('should format removed node correctly', () => {
		const tree = [{ type: 'removed', key: 'name', value: 'John' }]
		const result = stylishFormat(tree)
		expect(result).toEqual('{\n  - name: John\n}')
	})

	test('should format updated node correctly', () => {
		const tree = [
			{ type: 'updated', key: 'name', value1: 'John', value2: 'Doe' },
		]
		const result = stylishFormat(tree)
		expect(result).toEqual('{\n  - name: John\n  + name: Doe\n}')
	})

	test('should format nested node correctly', () => {
		const tree = [
			{
				type: 'nested',
				key: 'person',
				children: [{ type: 'unchanged', key: 'name', value: 'John' }],
			},
		]
		const result = stylishFormat(tree)
		expect(result).toEqual('{\n    person: {\n        name: John\n    }\n}')
	})

	test('should throw an error for unknown node type', () => {
		const tree = [{ type: 'unknown', key: 'name', value: 'John' }]
		expect(() => stylishFormat(tree)).toThrowError(
			'Unknown type! unknown is wrong!'
		)
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
})
