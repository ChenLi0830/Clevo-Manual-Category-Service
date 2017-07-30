/**
 * Created by Chen on 2017-07-29.
 */
'use strict';
const create = require('./create');
const TableName = require('../config').SentenceTable;
const _ = require('lodash');
const api = require('../../api');
const getSentence = require('./sentenceGet');

const createSentence = (args) => {
  return getSentence(args.categoryName, args.fileNameWithBeginTime)
  //Check for duplication
      .then(duplicate => {
        if (duplicate && duplicate.categoryName) {
          // operator exist
          return Promise.reject(new Error("Sentence with same categoryName and fileNameBeginTime already exist"));
        }
        args.id = args.fileNameWithBeginTime;
        return create(TableName, args);
      })
};

module.exports = createSentence;