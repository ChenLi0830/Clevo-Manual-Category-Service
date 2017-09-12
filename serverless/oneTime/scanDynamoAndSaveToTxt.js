let AWS = require("aws-sdk");
let docClient = new AWS.DynamoDB.DocumentClient();
const fs = require('fs');
    
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

// const updateAll = require('../graphql/database/CRUD/updateAll');
// const TableName = require('../graphql/database/config').RawSpeechTable;
const rawSpeechGetAll = require('../graphql/database/').rawSpeechGetAll;
const rawSpeechGet = require('../graphql/database/').rawSpeechGet;

(async() =>{
  try {
    // let speech = await rawSpeechGet("20170624105923_966_18280590077_601")
    // console.log(speech);
  
    let allSpeeches = await rawSpeechGetAll();
  
    for (let speech of allSpeeches) {
      if (!speech.organizationId || speech.organizationId!=="028e7749-645c-4a10-a394-d7116327e202"){
        if (!speech.transcriptionText) {
          console.log("transcriptionText doesn't exist, skip this speech");
          continue;
        }
        
        let keyword = "保护";
        if (speech.transcriptionText.indexOf(keyword)>-1){
          console.log("contains keyword: "+keyword, speech.transcriptionText.indexOf(keyword));
        }
    
        //Ignore calls that are doesn't contain keyword
        if (speech.transcriptionText.indexOf(keyword)<0) {
          console.log(`skip ${speech.fileName}`);
        } else {
          console.log("speech.transcriptionText", speech.transcriptionText);
          const transcriptionText = JSON.parse(speech.transcriptionText);
          
          let text = transcriptionText.reduce((text, transcription)=>`${text}\n\n${transcription.onebest}`, "");
      
          // Create dir if it is not existed
          const dir = './transcriptions_UMF';
          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }
      
          fs.writeFile(`${dir}/${speech.fileName}.txt`, text, (err) => {
            if(err) {
              return console.log(err);
            }
            console.log(`${speech.fileName}.txt was saved!`);
          });
      
      
        }
      }
    }
    
  } catch(err){
    console.log("err", err);
  }
  
})();
