let AWS = require("aws-sdk");
let docClient = new AWS.DynamoDB.DocumentClient();
let fs = require('fs');

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

const rawSpeechGetAll = require('../graphql/database/CRUD/rawSpeechGetAll');

return rawSpeechGetAll()
    .then(allSpeeches => {
      console.log("allSpeeches.length", allSpeeches.length);
      for (let speech of allSpeeches){
        if (speech.organizationId && speech.organizationId==="028e7749-645c-4a10-a394-d7116327e202"){
          const transcriptionText = JSON.parse(speech.transcriptionText);
          //Ignore calls that are less than 20 seconds
          if (!transcriptionText[transcriptionText.length - 1] || transcriptionText[transcriptionText.length - 1].ed < 20 * 1000) {
            console.log(`skip ${speech.fileName}`);
          } else {
            let text = transcriptionText.reduce((text, transcription)=>text + transcription.onebest, "");
  
            fs.writeFile(`transcriptions/${speech.fileName}.txt`, text, (err) => {
              if(err) {
                return console.log(err);
              }
              console.log(`${speech.fileName}.txt was saved!`);
            });
          }
        }
      }
    })

    .catch(err => {
      console.log("error" , err);
    });

