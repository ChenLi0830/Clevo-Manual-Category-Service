const sentenceCreate = require('./CRUD/sentenceCreate');
const speechCreate = require('./CRUD/speechCreate');
const rawSpeechGet = require('./CRUD/rawSpeechGet');
const rawSpeechUpdate = require('./CRUD/rawSpeechUpdate');

//fileName, operatorId, needReverseSpeaker, sentenceList
const speechSubmit = (args) => {
  // create speech promise
  let promises = [speechCreate(args)];
  // create sentence promises
  args.sentenceList.forEach(sentence => {
    promises.push(sentenceCreate(sentence))
  });
  
  // update uncategorizedSpeech
  return rawSpeechGet(args.fileName)
      .then(rawSpeech => {
        let newFields = {categorizedCount: ~~rawSpeech.categorizedCount + 1};
        return rawSpeechUpdate(args.fileName, newFields, {});
      })
  // create speech and sentences
      .then(() => Promise.all(promises))
      .then(result => result[0])
};

module.exports = speechSubmit;