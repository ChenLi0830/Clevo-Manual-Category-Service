let AWS = require("aws-sdk");
let docClient = new AWS.DynamoDB.DocumentClient();

// Use this to protect from accidentally apply this to production server
if (!process.env.PRODUCTION_MODE) {
  console.log("testing on local server");
  AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    accessKeyId: "123",
    secretAccessKey: "345",
  });
} else {
  console.log("Applying changes on AWS server");
  AWS.config.update({
    region: "us-west-2",
  });
}

const copyTableAToB = require('../graphql/database/CRUD/copyTableAToB');
const TableNameA = "transcription_table";
const TableNameB = require('../graphql/database/config').RawSpeechTable;

const getAll = require('../graphql/database/CRUD/getAll');

return copyTableAToB(TableNameA, TableNameB)
    .catch(err => {
      console.error(err);
    });
