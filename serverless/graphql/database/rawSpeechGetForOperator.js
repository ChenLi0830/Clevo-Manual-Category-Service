/**
 * Priorities:
 * 1. return a speech uncategorized by anyone first
 * 2. if all speeches are categorized, return a speech uncategorized by this operator
 * */
const rawSpeechGetAll = require('./CRUD/rawSpeechGetAll');
const operatorGet = require('./CRUD/operatorGet');
const _ = require('lodash');

const rawSpeechGetForOperator = (operatorId) => {
  // transcription_table
  return Promise.all([
    rawSpeechGetAll(),
    operatorGet(operatorId),
  ])
      .then(result => {
        let allRawSpeech = result[0];
        let operator = result[1];
  
        let uncategorizedSpeechList = _.filter(allRawSpeech, (rawSpeech)=>{
          let hasTranscription = rawSpeech.transcriptionText && rawSpeech.transcriptionText.length>0;
          let isUncategorized = !rawSpeech.categorizedCount || rawSpeech.categorizedCount===0;
          return hasTranscription && isUncategorized;
        });
        // return a random speech from Uncategorized speech list
        if (uncategorizedSpeechList.length > 0) return _.sample(uncategorizedSpeechList);
        else return null;
        
        // Todo: do double and triple categorization check;
      })
};

module.exports = rawSpeechGetForOperator;