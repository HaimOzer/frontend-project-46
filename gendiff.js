#!/usr/bin/env node
import { Command } from 'commander'
import parseFile from './fileParser.js'
import _ from 'lodash'

const program = new Command()

program
	.description('Compares two configuration files and shows a difference.')
	.version('1.0.0', '-V, --version', 'output the version number')
	.option('-h, --help', 'output usage information')
	.option('-f, --format <type>', 'output format')
	.arguments('<filepath1> <filepath2>')
	.action((filepath1, filepath2) => {
		const data1 = parseFile(filepath1)
		const data2 = parseFile(filepath2)

		// console.log('Data from file 1:', data1)
		// console.log('Data from file 2:', data2)

		const keys = _.union(Object.keys(data1), Object.keys(data2)).sort()

		const differences = keys.map(key => {
			if (_.isEqual(data1[key], data2[key])) {
				return `  ${key}: ${data1[key]}`
			}

			if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
				return `- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`
			}

			if (Object.hasOwn(data1, key)) {
				return `- ${key}: ${data1[key]}`
			}
			return `+ ${key}: ${data2[key]}`
		})

		console.log(differences.join('\n'))
	})

program.parse(process.argv)

if (process.argv.includes('-h') || process.argv.includes('--help')) {
	program.outputHelp()
}
