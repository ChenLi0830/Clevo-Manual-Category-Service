'use strict';
const TableName = require('../config').OperatorTable;
const getAll = require('./getAll');

const getAllOperators = (options = {}) => {
  return getAll(TableName, options);
};

module.exports = getAllOperators;