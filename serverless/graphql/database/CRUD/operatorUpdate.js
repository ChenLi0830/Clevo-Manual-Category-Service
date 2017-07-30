'use strict';
const TableName = require('../config').OperatorTable;
const update = require('./update');

const updateOperator = (cellphone, newFields, options = {}) => {
  return update(TableName, {cellphone}, newFields, options)
};

module.exports = updateOperator;