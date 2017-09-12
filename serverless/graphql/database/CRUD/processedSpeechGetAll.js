'use strict';
const TableName = require('../config').ProcessedSpeechTable;
const getAll = require('./getAll');

const getAllProcessedSpeech = (options = {}) => {
  return getAll(TableName, options);
};

module.exports = getAllProcessedSpeech;