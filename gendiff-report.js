import _ from 'lodash'
import parseFile from './fileParser.js'

function genDiff(filepath1, filepath2) {
	const data1 = parseFile(filepath1)
	const data2 = parseFile(filepath2)

	const keys = _.union(Object.keys(data1), Object.keys(data2)).sort()

	const differences = keys.map(key => {
		if (_.isEqual(data1[key], data2[key])) {
			return `  ${key}: ${data1[key]}`
		}

		if (
			Object.hasOwnProperty.call(data1, key) &&
			Object.hasOwnProperty.call(data2, key)
		) {
			return `- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`
		}

		if (Object.hasOwnProperty.call(data1, key)) {
			return `- ${key}: ${data1[key]}`
		}

		return `+ ${key}: ${data2[key]}`
	})

	return differences.join('\n')
}

export default genDiff
