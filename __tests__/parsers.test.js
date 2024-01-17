import parse from '../src/parsers'

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
