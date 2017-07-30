'use strict';

const _ = require('lodash');
const db = require('./database');

const graphql = require('graphql'),
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLSchema = graphql.GraphQLSchema,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull,
    GraphQLFloat = graphql.GraphQLFloat,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLID = graphql.GraphQLID;

const OperatorType = require('./types/OperatorType');
const SentenceType = require('./types/SentenceType');
const SpeechType = require('./types/SpeechType');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    operator: {
      type: OperatorType,
      args: {cellphone: {type: GraphQLID}},
      resolve: (parentValue, args) => {
        return db.operatorGet(args.cellphone);
      }
    },
    sentence: {
      type: SentenceType,
      args: {
        categoryName: {type: GraphQLString},
        fileNameBeginTime: {type: GraphQLString},
      },
      resolve: (parentValue, args) => {
        return db.sentenceGet(args.categoryName, args.fileNameBeginTime);
      }
    },
    speech: {
      type: SpeechType,
      args: {
        fileName: {type: GraphQLString},
        operatorId: {type: GraphQLString},
      },
      resolve: (parentValue, args) => {
        return db.sentenceGet(args.fileName, args.operatorId);
      }
    }
  }
});

module.exports = RootQuery;