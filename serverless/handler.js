'use strict';
const handle = require('./graphql/index');

module.exports.graphql = (event, context, callback) => {
  /** Immediate response for WarmUP plugin */
  if (event.source === 'serverless-plugin-warmup') {
    console.log('WarmUP - Lambda is warm!');
    return callback(null, 'Lambda is warm!')
  }
  
  // if (!event.body) {
  //   console.log("Scheduled post request event");
  //   let response = {
  //     statusCode: 200,
  //     headers: {"Access-Control-Allow-Origin": "*"},
  //   };
  //   return callback(null, response);
  // }
  
  if (typeof event.body === "string") event.body = JSON.parse(event.body);
  console.log("body", event.body);

  handle(event.body.query, event.body.variables)
      .then((result) => {
  
        console.log("result", result);
  
        let response = {
          statusCode: 200,
          headers: {"Access-Control-Allow-Origin": "*"},
          body: JSON.stringify({
            data: result.data,
            errors: result.errors
          }),
        };
        
        callback(null, response);
      })
      .catch((error) => callback(error));
};

