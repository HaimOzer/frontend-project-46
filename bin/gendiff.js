#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/getDifferents.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const option = program.opts();
    console.log(genDiff(filepath1, filepath2, option.format));
  });

program.parse();
