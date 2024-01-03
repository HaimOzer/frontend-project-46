#!/usr/bin/env node

// const { Command } = require('commander')
// const program = new Command()
import { Command } from 'commander'
import parseFile from './fileParser.js'

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

		console.log('Data from file 1:', data1)
		console.log('Data from file 2:', data2)
	})

program.parse(process.argv)

if (process.argv.includes('-h') || process.argv.includes('--help')) {
	program.outputHelp()
}

// const diff = genDiff(filepath1, filepath2)
// console.log(diff)
