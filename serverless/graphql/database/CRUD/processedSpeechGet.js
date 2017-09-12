'use strict';
const TableName = require('../config').ProcessedSpeechTable;
const get = require('./get');

const getProcessedSpeech = (fileName) => {
  return get(TableName, {fileName});
};

module.exports = getProcessedSpeech;