const tableName = require('./config').RawSpeechTable;
const indexName = require('./config').RawSpeechIndexTaskId;

'use strict';
let AWS = require('./config').AWS;
let docClient = new AWS.DynamoDB.DocumentClient();

const queryIndexBy = (tableName, key, options={}) => {
  const {AttributesToGet=null, ConsistentRead=false} = options;
  let params = {
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression: 'xfTaskId = :xfTaskId',
    ExpressionAttributeValues: {
      ':xfTaskId': 'e6475f08b6b043dbb4dc6d3ae8e0dbb3',
    }
    // Key: key,
    // AttributesToGet,
    // ConsistentRead,
  };
  
  
  
  return new Promise((resolve, reject) => {
    docClient.query(params, function(err, data) {
      if (err) {
        console.error(`Unable to query item(s) from ${indexName} of ${tableName}. Error JSON:`, JSON.stringify(err), err.stack);
        return reject(err);
      }
      console.log(`Successfully query item(s) from ${tableName}`);
      console.log("data", data);
      resolve(data);
      // else callback(null, data);
    });
    
    // docClient.get(params, (err, data) => {
    //   if (err) {
    //     console.error(`Unable to get item from ${tableName}. Error JSON:`, JSON.stringify(err), err.stack);
    //     return reject(err);
    //   }
    //   console.log(`Successfully get item from ${tableName}`);
    //   resolve(data.Item);
    // });
  });
};

module.exports = queryIndexBy;
