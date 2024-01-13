import path, { dirname } from 'path'
import getFixturesPath from '../src/getFixturesPath.js'
import { fileURLToPath } from 'url'
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
