"use strict";
const _ = require('lodash');

const getTimeInSec = () => {
  return Math.trunc(new Date().getTime() / 1000);
};

/**
 * Get the urgency level of a card, namely, how soon is it going to expire (0 - very urgent, 1 -
 * urgent, 2 - normal)
 * */
const getUrgency = (stampValidDays, expireInDays) => {
  console.log("stampValidDays, expireInDays", stampValidDays, expireInDays);
  let urgencyArray = [
    [2, 4, 7],
    [3, 7, 14],
    [5, 15, 30],
  ];
  // Get correct row
  let row;
  for (row = 0; row < urgencyArray.length; row++) {
    // row is found
    if (urgencyArray[row][2] >= stampValidDays) break;
  }
  if (row === urgencyArray.length) row--;
  
  // Get urgency
  let urgency;
  for (urgency = 0; urgency < urgencyArray[row].length; urgency++) {
    // urgencyLevel is found
    if (urgencyArray[row][urgency] >= expireInDays) break;
  }
  if (urgency === urgencyArray[0].length) urgency--;
  return urgency;
};

//Get params for DynamoDB table update calls
/**
 * Get 'UpdateExpression' from key-value pair object
 * @param {object} newFields - single layer object with scala keys and values
 * */
const getUpdateExpression = (newFields) => {
  let UpdateExpression = "SET";
  for (let fieldKey of Object.keys(newFields)) {
    UpdateExpression += ` #${fieldKey} = :${fieldKey},`
  }
  //Return UpdateExpression after trimming the last character ','
  return UpdateExpression.slice(0, -1);
};

const getExpressionAttributeNames = (newFields) => {
  let ExpressionAttributeNames = {};
  for (let fieldKey of Object.keys(newFields)) {
    ExpressionAttributeNames[`#${fieldKey}`] = fieldKey;
  }
  return ExpressionAttributeNames;
};

/**
 * Get 'ExpressionAttributeValues' from key-value pair object
 * @param {object} obj - single layer object with scala keys and values
 * */
const getExpressionAttributeValues = (obj) => {
  let ExpressionAttributeValues = {};
  for (let fieldKey of Object.keys(obj)) {
    ExpressionAttributeValues[`:${fieldKey}`] = obj[fieldKey];
  }
  return ExpressionAttributeValues;
};

/**
 * Get 'KeyConditionExpression' from key-value pair object
 * @param {object} key - single layer object with scala keys and values
 * */
const getKeyConditionExpression = (key) => {
  // if just partition key
  if (Object.keys(key).length===1) {
    return ` ${Object.keys(key)[0]} = :${Object.keys(key)[0]}`;
  }
  // if both partition key and range key
  else {
    return ` ${Object.keys(key)[0]} = :${Object.keys(key)[0]} AND ${Object.keys(key)[1]} = :${Object.keys(key)[1]} `;
  }
};


/**
 * Prepare args to be ready for inserting into DynamoDB
 * */
const removeInvalidArgs = (args) => {
  for (let key of Object.keys(args)){
    const isEmptyString = typeof args[key] === "string" && args[key].length === 0;
    const isNull = args[key] === null;
    if (isNull || isEmptyString){
      args[key] = undefined;
    }
  }
  return args;
};

/**
 * check if user visited a restaurant before
 * */
const userVisitedRestaurantBefore = (user, restaurantId) => {
  let visitedRestaurants = user.visitedRestaurants;
  return _.includes(visitedRestaurants, restaurantId);
};

/**
 * Get the profile picture of a user using id
 * */
const getUserPhotoURL = (id) => {
  return fetch(`http://graph.facebook.com/v2.9/${id}/picture?redirect=false`)
      .then((response)=>{
        if (response.status >= 400) {
          // throw new Error("Bad response from server");
          console.log("Bad response from server");
          return {data: {}};
        }
        return response.json();
      })
      .then(result => result.data.url)
};

module.exports = {
  getTimeInSec,
  getUrgency,
  getUpdateExpression,
  getExpressionAttributeNames,
  getExpressionAttributeValues,
  getKeyConditionExpression,
  removeInvalidArgs,
  userVisitedRestaurantBefore,
  getUserPhotoURL,
};