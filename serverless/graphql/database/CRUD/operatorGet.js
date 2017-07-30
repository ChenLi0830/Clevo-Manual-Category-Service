'use strict';
const TableName = require('../config').OperatorTable;
const get = require('./get');

const getOperator = (cellphone) => {
  return get(TableName, {cellphone});
};

module.exports = getOperator;