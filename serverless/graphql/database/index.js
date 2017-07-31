'use strict';

const operatorGet = require('./CRUD/operatorGet');
const operatorCreate = require('./CRUD/operatorCreate');
const operatorUpdate = require('./CRUD/operatorUpdate');
const operatorGetAll = require('./CRUD/operatorGetAll');
const operatorUpsert = require('./operatorUpsert');

const speechGet = require('./CRUD/speechGet');
const speechCreate = require('./CRUD/speechCreate');
const speechGetAll = require('./CRUD/speechGetAll');
const speechSubmit = require('./speechSubmit');

const sentenceCreate = require('./CRUD/sentenceCreate');
const sentenceGet = require('./CRUD/sentenceGet');
const sentenceGetAll = require('./CRUD/sentenceGetAll');

const rawSpeechCreate = require('./CRUD/rawSpeechCreate');
const rawSpeechGet = require('./CRUD/rawSpeechGet');
const rawSpeechGetAll = require('./CRUD/rawSpeechGetAll');
const rawSpeechUpdate = require('./CRUD/rawSpeechUpdate');
const rawSpeechGetForOperator = require('./rawSpeechGetForOperator');

module.exports = {
  operatorGet,
  operatorCreate,
  operatorUpdate,
  operatorGetAll,
  operatorUpsert,
  speechGet,
  speechCreate,
  speechGetAll,
  speechSubmit,
  sentenceCreate,
  sentenceGet,
  sentenceGetAll,
  rawSpeechCreate,
  rawSpeechGet,
  rawSpeechGetAll,
  rawSpeechUpdate,
  rawSpeechGetForOperator,
};