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
//
// const updateAll = require('../graphql/database/CRUD/updateAll');
// const TableName = require('../graphql/database/config').RawSpeechTable;
//
// // dynamodb.describeTable()
// // docClient.table
//
// return updateAll(TableName, ["fileName"], {compandId: "test2"}, true)
//     .catch(err => {
//       console.log("promise err", err);
//     });

var params = {
  TableName: 'Table',
  IndexName: 'Index',
  KeyConditionExpression: 'HashKey = :hkey and RangeKey > :rkey',
  ExpressionAttributeValues: {
    ':hkey': 'key',
    ':rkey': 2015
  }
};

var documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.query(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});




