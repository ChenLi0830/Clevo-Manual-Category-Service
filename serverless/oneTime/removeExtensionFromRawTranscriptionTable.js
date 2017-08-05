'use strict';
let AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
});

const rawSpeechGetAll = require('../graphql/database').rawSpeechGetAll;
// const rawSpeechUpdate = require('../graphql/database').rawSpeechUpdate;
const rawSpeechCreate = require('../graphql/database').rawSpeechCreate;

const removeExtensionFromRawTranscriptionTable = () => {
  // updateExistingStampEvents
  return rawSpeechGetAll()
      .then(allSpeeches => {
        let promises = [];
        for (let speech of allSpeeches){
          let newSpeech = Object.assign({}, speech);
          newSpeech.fileName = speech.fileName.split(".")[0];
          newSpeech.fileExtension = speech.fileName.split(".")[1];
          promises.push(rawSpeechCreate(newSpeech));
        }
        
        return Promise.all(promises)
      })
};

removeExtensionFromRawTranscriptionTable();
