import stylishFormat from '../src/formatters/stylish'

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
