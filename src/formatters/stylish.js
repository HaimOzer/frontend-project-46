import _ from 'lodash'
/**
 * Converts a difference tree to a stylishly formatted string.
 *
 * @param {Array} tree - The difference tree to be formatted.
 * @param {number} [depth=1] - The current depth of the tree (used for indentation).
 * @param {number} [indentCount=4] - The number of spaces to use for each level of indentation.
 * @param {string} [indent=' '] - The string to use for indentation.
 * @returns {string} A stylishly formatted string representing the differences in the tree.
 */

const stringify = (value, depth = 1, indentCount = 4, indent = ' ') => {
	if (!_.isObject(value)) {
		return value
	}
	const indentSize = depth * indentCount
	const currentIndent = indent.repeat(indentSize)
	const bracketsIndent = indent.repeat(indentSize - indentCount)
	const result = Object.keys(value).map(
		key => `${currentIndent}${key}: ${stringify(value[key], depth + 1)}`
	)
	return ['{', ...result, `${bracketsIndent}}`].join('\n')
}

function stylishFormat(tree, depth = 1, indentCount = 4, indent = ' ') {
	const indentSize = depth * indentCount
	const currentIndent = indent.repeat(indentSize)
	const changedLineIndent = indent.repeat(indentSize - 2)
	const bracketsIndent = indent.repeat(indentSize - indentCount)
	const result = tree.map(node => {
		switch (node.type) {
			case 'unchanged':
				return `${currentIndent}${node.key}: ${stringify(node.value, depth + 1)}`
			case 'added':
				return `${changedLineIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`
			case 'removed':
				return `${changedLineIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`
			case 'updated':
				return [
${changedLineIndent}- ${node.key}: ${stringify(node.value1, depth + 1)}`,`
${changedLineIndent}+ ${node.key}: ${stringify(node.value2, depth + 1	)}`,
].join('\n')
			case 'nested':
				return `${currentIndent}${node.key}: ${stylishFormat(node.children, depth + 1)}`
			default:
				throw new Error(`Unknown type! ${node.type} is wrong!`)
		}
	})
	return ['{', ...result, `${bracketsIndent}}`].join('\n')
}
export default stylishFormat
