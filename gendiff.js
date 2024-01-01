#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .description('Compares two configuration files and shows the differences')
  .version('1.0.0', '-V, --version', 'Get version number')
  .option('-h, --help', 'Get manual info');

program.parse(process.argv);

if (program.help) {
  program.outputHelp();
}
