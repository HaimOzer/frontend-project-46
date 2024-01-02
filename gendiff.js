#!/usr/bin/env node

// const { Command } = require('commander')
// const program = new Command()
import { Command } from 'commander'
const program = new Command()

program
	.description('Compares two configuration files and shows a difference.')
	.version('1.0.0', '-V, --version', 'output the version number')
	.option('-h, --help', 'output usage information')
	.option('-f, --format <type>', 'output format')
	.arguments('[filepath1] [filepath2]')

program.parse(process.argv)

if (program.help) {
	program.outputHelp()
}
// const diff = genDiff(filepath1, filepath2)
// console.log(diff)

// if (program.help) {
// 	console.log('Usage: gendiff [options] <filepath1> <filepath2>\n')
// 	console.log('Compares two configuration files and shows a difference.\n')
// 	console.log('Options:')
// 	console.log('  -V, --version        output the version number')
// 	console.log('  -h, --help           output usage information')
// 	console.log('  -f, --format <type>  output format\n')
// }
