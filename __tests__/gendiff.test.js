import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import getExtension from '../src/getExtension.js';
import getContentFile from '../src/getContentFile.js';
import genDiff from '../src/getDifferents.js';
import formatSelector from '../src/formatters/index.js';
import stylishFormat from '../src/formatters/stylish.js';
import plainFormat from '../src/formatters/plain.js';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturesPath = (file) => path.resolve(__dirname, '..', '__fixtures__', file);

describe('getExtension function', () => {
  test('correct extension of file', () => {
    expect(getExtension('file1.json')).toBe('json');
  });
});

describe('parse function', () => {
  test('should throw an error for unknown format', () => {
    const invalidFormat = 'csv';
    expect(() => parse('', invalidFormat)).toThrow(
      `Unknown type! Type ${invalidFormat} is not supported!`,
    );
  });
});

describe('genDiff function', () => {
  const cases = ['json', 'yaml', 'yml'];
  const expectedStylish = getContentFile(getFixturesPath('expectedStylishFormat.txt'));
  const expectedPlain = getContentFile(getFixturesPath('expectedPlainFormat.txt'));
  const expectedJSON = getContentFile(getFixturesPath('expectedJsonFormat.txt'));

  test.each(cases)('correctly generates differences tree', (extension) => {
    const data1 = getFixturesPath(`file1.${extension}`);
    const data2 = getFixturesPath(`file2.${extension}`);

    const currentDefaultFormat = genDiff(data1, data2);
    const currentStylishFormat = genDiff(data1, data2, 'stylish');
    const currentPlainFormat = genDiff(data1, data2, 'plain');
    const currentJSONFormat = genDiff(data1, data2, 'json');

    expect(currentDefaultFormat).toEqual(expectedStylish);
    expect(currentStylishFormat).toEqual(expectedStylish);
    expect(currentPlainFormat).toEqual(expectedPlain);
    expect(currentJSONFormat).toEqual(expectedJSON);
  });

  test('should throw an error for unknown format type', () => {
    const data = getFixturesPath('file1.json');
    const format = 'js';
    expect(() => formatSelector(data, format)).toThrow(`Unknown type! Type ${format} is not supported!`);
  });
});

describe('stylishFormat', () => {
  test('should throw an error for unknown type', () => {
    const tree = [{ key: 'status', type: 'unknown', value: 'error' }];

    // Wrap the function call in a function to expect the error
    const callStylishFormat = () => stylishFormat(tree);

    // Expecting an error to be thrown with a specific message
    expect(callStylishFormat).toThrow(`Unknown type! ${tree[0].type} is wrong!`);
  });
});

describe('plainFormat', () => {
  test('should throw an error for unknown type', () => {
    const tree = [{ key: 'status', type: 'unknown', value: 'error' }];

    // Wrap the function call in a function to expect the error
    const callPlainFormat = () => plainFormat(tree);

    // Expecting an error to be thrown with a specific message
    expect(callPlainFormat).toThrow(`Unknown type! ${tree[0].type} is wrong!`);
  });
});
