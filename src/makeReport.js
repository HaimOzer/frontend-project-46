/**
 * Generates a report highlighting the differences between two sets of data.
 *
 * @param {Object} data1 - The first set of data.
 * @param {Object} data2 - The second set of data.
 * @returns {string} A formatted string representing the differences between the two sets of data.
 */

import _ from 'lodash'

const makeReport = (data1, data2) => {
	const keys = _.union(Object.keys({ ...data1, ...data2 })).sort()

	const differences = keys.map(key => {
		if (_.isEqual(data1[key], data2[key])) {
			return { key, value: data1[key], status: 'unchanged' }
		}

		if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
			return {
				key,
				children: makeReport(data1[key], data2[key]),
				status: 'nested',
			}
		}

		if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
			return { key, value: data1[key], status: 'removed' }
		}

		return { key, value: data2[key], status: 'added' }
	})

	return differences
}

export default makeReport
