'use strict';

let AWS = require("aws-sdk");

/**
 * For testing on local DynamoDB
 **/
console.log("process.env.DEBUG_MODE", process.env.DEBUG_MODE);
if (process.env.DEBUG_MODE) {
  AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    accessKeyId: "123",
    secretAccessKey: "345",
  });
}

const OperatorTable = "Clevo-Manual-Operators";
const SpeechTable = "Clevo-Categorized-Speech-Table";
const SentenceTable = "Clevo-Categorized-Sentence-Table";
const RawSpeechTable = "transcription_table";

module.exports = {
  OperatorTable,
  SpeechTable,
  SentenceTable,
  RawSpeechTable,
  AWS
};