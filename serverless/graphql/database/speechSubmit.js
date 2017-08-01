const sentenceCreate = require('./CRUD/sentenceCreate');
const speechCreate = require('./CRUD/speechCreate');
const rawSpeechGet = require('./CRUD/rawSpeechGet');
const rawSpeechUpdate = require('./CRUD/rawSpeechUpdate');
const operatorGet = require('./CRUD/operatorGet');
const operatorUpdate = require('./CRUD/operatorUpdate');

//fileName, operatorId, needReverseSpeaker, sentenceList
const speechSubmit = (args) => {
  // create speech promise
  let promises = [speechCreate(args)];
  // create sentence promises
  args.sentenceList.forEach(sentence => {
    promises.push(sentenceCreate(sentence))
  });
  
  // update rawSpeechTable and operatorTable
  return Promise.all([
    rawSpeechGet(args.fileName)
        .then(rawSpeech => {
          let newFields = {categorizedCount: ~~rawSpeech.categorizedCount + 1};
          return rawSpeechUpdate(args.fileName, newFields, {});
        }),
    operatorGet(args.operatorId)
        .then(operator => {
          let newFields = {
            speechCount: ~~operator.speechCount + 1,
            sentenceCount: ~~operator.sentenceCount + args.sentenceList.length,
          };
          return operatorUpdate(args.fileName, newFields, {});
        })
  ])
  // create speech and sentences
      .then(() => Promise.all(promises))
      .then(result => result[0])
};

module.exports = speechSubmit;