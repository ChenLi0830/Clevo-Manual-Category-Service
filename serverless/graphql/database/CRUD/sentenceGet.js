/**
 * Created by Chen on 2017-07-29.
 */
'use strict';
const TableName = require('../config').SentenceTable;
const get = require('./get');

const getSentence = (categoryName, fileNameWithBeginTime) => {
  return get(TableName, {categoryName, fileNameWithBeginTime});
};

module.exports = getSentence;