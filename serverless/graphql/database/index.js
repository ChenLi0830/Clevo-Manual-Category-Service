'use strict';

const operatorGet = require('./CRUD/operatorGet');
const operatorCreate = require('./CRUD/operatorCreate');
const operatorUpdate = require('./CRUD/operatorUpdate');
const operatorGetAll = require('./CRUD/operatorGetAll');

const speechGet = require('./CRUD/speechGet');
const speechCreate = require('./CRUD/speechCreate');
const speechGetAll = require('./CRUD/speechGetAll');

const sentenceCreate = require('./CRUD/sentenceCreate');
const sentenceGet = require('./CRUD/sentenceGet');
const sentenceGetAll = require('./CRUD/sentenceGetAll');

module.exports = {
  operatorGet,
  operatorCreate,
  operatorUpdate,
  operatorGetAll,
  speechGet,
  speechCreate,
  speechGetAll,
  sentenceCreate,
  sentenceGet,
  sentenceGetAll,
};