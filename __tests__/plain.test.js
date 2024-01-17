import plainFormat from '../src/formatters/plain.js'

describe('plainFormat', () => {
	it('should format added properties', () => {
		const tree = [
			{ key: 'name', type: 'added', value: 'John' },
			{ key: 'age', type: 'added', value: 25 },
		]
		const result = plainFormat(tree)
		expect(result).toMatch(`Property 'name' was added with value: 'John'`)
		expect(result).toMatch(`Property 'age' was added with value: 25`)
	})

	it('should format removed properties', () => {
		const tree = [
			{ key: 'name', type: 'removed' },
			{ key: 'age', type: 'removed' },
		]
		const result = plainFormat(tree)
		expect(result).toMatch(`Property 'name' was removed`)
		expect(result).toMatch(`Property 'age' was removed`)
	})

	it('should format updated properties', () => {
		const tree = [
			{ key: 'name', type: 'updated', value1: 'John', value2: 'Jane' },
			{ key: 'age', type: 'updated', value1: 25, value2: 26 },
		]
		const result = plainFormat(tree)
		expect(result).toMatch(`Property 'name' was updated. From 'John' to 'Jane'`)
		expect(result).toMatch(`Property 'age' was updated. From 25 to 26`)
	})

	it('should format nested properties', () => {
		const tree = [
			{
				key: 'person',
				type: 'nested',
				children: [
					{ key: 'name', type: 'added', value: 'John' },
					{ key: 'age', type: 'updated', value1: 25, value2: 26 },
				],
			},
		]
		const result = plainFormat(tree)
		expect(result).toMatch(
			`Property 'person.name' was added with value: 'John'`
		)
		expect(result).toMatch(`Property 'person.age' was updated. From 25 to 26`)
	})

	it('should throw an error for unknown type', () => {
		const tree = [{ key: 'name', type: 'unknown' }]
		expect(() => plainFormat(tree)).toThrow('Unknown type! unknown is wrong!')
	})
})
