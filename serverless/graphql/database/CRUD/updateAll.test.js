let AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  accessKeyId: "123",
  secretAccessKey: "345",
});

const updateAll = require('./updateAll');
const TableName = require('../config').RawSpeechTable;

describe('updateAll', () => {
  it('no force', () => {
    return updateAll(TableName, ["fileName"], {compandId: "test"})
        .then(updatedItems => {
          let undefinedCount = 0;
          for (let item of updatedItems) {
            undefinedCount += item === undefined ? 1 : 0;
          }
          // console.log("result", result);
          expect(undefinedCount).toBe(updatedItems.length);
        })
  });
  
  it('force update', () => {
    return updateAll(TableName, ["fileName"], {compandId: "test"}, true)
        .then(updatedItems => {
          let undefinedCount = 0;
          for (let item of updatedItems) {
            undefinedCount += item === undefined ? 1 : 0;
          }
          // console.log("result", result);
          expect(undefinedCount).toBe(0);
        })
  });
});
