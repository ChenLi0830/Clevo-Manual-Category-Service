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
const SpeechType = require('./types/SpeechType');
const RawSpeechType = require('./types/RawSpeechType');
const SentenceType = require('./types/SentenceType');
const SentenceInputType = require('./types/SentenceInputType');

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createOperator: {
      type: OperatorType,
      args:{
        cellphone: {type: GraphQLID}
      },
      resolve: (parentValue, args) => {
        return db.operatorCreate(args);
      }
    },
    operatorUpsert: {
      type: OperatorType,
      args:{
        cellphone: {type: GraphQLID}
      },
      resolve: (parentValue, args) => {
        return db.operatorUpsert(args);
      }
    },
    
    speechSubmit: {
      type: SpeechType,
      args:{
        fileName: {type: GraphQLString},
        operatorId: {type: GraphQLString},
        needReverseSpeaker: {type: GraphQLBoolean},
        // categorizedSpeech: {type: GraphQLString},
        sentenceList: {type: new GraphQLList(SentenceInputType)},
      },
      resolve: (parentValue, args) => {
        return db.speechSubmit(args);
      }
    },
  
    createRawSpeech: {
      type: RawSpeechType,
      args:{
        fileName: {type: GraphQLString},
        transcribedAt: {type: GraphQLString},
        transcriptionText: {type: GraphQLString},
        // categorizedCount: {type: GraphQLInt},
      },
      resolve: (parentValue, args) => {
        return db.rawSpeechCreate(args);
      }
    },
    
    // createSpeech: {
    //   type: SpeechType,
    //   args:{
    //     fileName: {type: GraphQLString},
    //     operatorId: {type: GraphQLString},
    //     needReverseSpeaker: {type: GraphQLBoolean},
    //   },
    //   resolve: (parentValue, args) => {
    //     return db.speechAndSentenceCreate(args);
    //   }
    // },
  }
});

module.exports = mutation;