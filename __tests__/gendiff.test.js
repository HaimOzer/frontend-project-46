import { genDiff } from '../gendiff'
import test from 'jest'
test('identical keys', () => {
	const filepath1 = './__fixtures/data1.json'
	const filepath2 = './__fixtures/data2.json'
	const result = genDiff(filepath1, filepath2)
	const toEqual = `  a: 1\n  b: 2\n  c: 3`
	expect(result).toEqual(toEqual)
})
