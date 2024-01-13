import path, { dirname } from 'path'
import getFixturesPath from '../src/getFixturesPath.js'
import { fileURLToPath } from 'url'
import getExtension from '../src/getExtension.js'
import genDiff from '../src/differencer.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

test('correct path to __fixtures__ directory', () => {
	const expectedPath = path.resolve(
		__dirname,
		'..',
		'__fixtures__',
		'file1.json'
	)
	expect(getFixturesPath('file1.json')).toBe(expectedPath)
})

test('correct extension of file', () => {
	expect(getExtension('file1.json')).toBe('json')
	expect(getExtension('file1.yaml')).toBe('yaml')
	expect(getExtension('file1.yml')).toBe('yml')
})
