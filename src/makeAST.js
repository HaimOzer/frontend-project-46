import _ from 'lodash';
/**
 * Generates a report highlighting the differences between two sets of data.
 *
 * @param {Object} data1 - The first set of data.
 * @param {Object} data2 - The second set of data.
 * @returns {string} A formatted string representing the differences between the two sets of data.
 * Each object in the array has the following structure:
 *   - key {string} - The key representing the property in the data.
 *   - value {*} - The value of the property.
 *   - status {string} - The status of the property ('unchanged', 'nested', 'removed', or 'added').
 *   - children {Array} - An array of objects representing differences if the property is nested.
 */

const makeAST = (data1, data2) => {
  const unitedFiles = { ...data1, ...data2 };
  const keys = _.sortBy(Object.keys(unitedFiles), (key) => key);

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, type: 'added', value: value2 };
    }

    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, type: 'removed', value: value1 };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, type: 'nested', children: makeAST(value1, value2) };
    }

    if (!_.isEqual(value1, value2)) {
      return {
        key, type: 'updated', value1, value2,
      };
    }

    return { key, type: 'unchanged', value: value1 };
  });
};

export default makeAST;
