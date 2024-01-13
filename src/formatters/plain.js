import _ from 'lodash'

const buildPath = (path, key) => (path === '' ? key : `${path}.${key}`)
const setValue = currentValue => {
	if (!_.isObject(currentValue)) {
		return _.isString(currentValue) ? `'${currentValue}'` : `${currentValue}`
	}
	return '[complex value]'
}

/**
 * Builds a plain format representation of changes in a tree structure.
 *
 * @param {Object} tree - The tree structure representing changes.
 * @returns {string} The plain format representation of changes.
 */

function plainFormat(tree) {
	/**
	 * Recursively iterates over the tree structure and generates plain format strings.
	 *
	 * @param {Array} node - The current node in the tree.
	 * @param {string} path - The current path in the tree.
	 * @returns {string} The plain format representation of changes within the node.
	 */

	const iter = (node, path) => {
		const result = node
			.filter(item => item.type !== 'unchanged')
			.map(obj => {
				const { key, type, value } = obj
				const currentPath = buildPath(path, key)
				switch (type) {
					case 'added':
						return `Property '${currentPath}' was added with value: ${setValue(
							value
						)}`
					case 'removed':
						return `Property '${currentPath}' was removed`
					case 'updated':
						return `Property '${currentPath}' was updated. From ${setValue(
							obj.value1
						)} to ${setValue(obj.value2)}`
					case 'nested':
						return iter(obj.children, currentPath)
					default:
						throw new Error(`Unknown type! ${type} is wrong!`)
				}
			})
		return result.join('\n')
	}
	return iter(tree, '')
}

export default plainFormat
