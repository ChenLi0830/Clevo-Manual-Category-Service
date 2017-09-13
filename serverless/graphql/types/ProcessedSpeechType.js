'use strict';

const db = require('../database');

const graphql = require('graphql'),
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLFloat = graphql.GraphQLFloat,
    GraphQLID = graphql.GraphQLID;

const EmotionType = require('./EmotionType');



const CategorizedTranscriptType = new GraphQLObjectType({
  name: "categorizedTranscript",
  fields: () => ({
    // categoryName: {type: GraphQLString},
    // fileNameBeginTime: {type: GraphQLString},
    // operatorId: {type: GraphQLID},
    // fileName: {type: GraphQLString},
    bg: {type: GraphQLString},
    ed: {type: GraphQLString},
    onebest: {type: GraphQLString},
    speaker: {type: GraphQLString},
    alertWords: {type: new GraphQLList(GraphQLString)},
    bannedWords: {type: new GraphQLList(GraphQLString)},
    categories: {type: GraphQLString},
    // categories: {type: new GraphQLList(GraphQLString)},
  })
});

const ProcessedSpeechType = new GraphQLObjectType({
  name: "ProcessedSpeech",
  fields: () => ({
    id: {type: GraphQLID}, // cellphone
    fileName: {type: GraphQLString},
    employeeId: {type: GraphQLString},
    categorizedSpeechTopic: {type: GraphQLString},
    speechDuration: {type: GraphQLFloat},
    silenceDuration: {type: GraphQLFloat},
    speaker1TalkDuration: {type: GraphQLFloat},
    speaker2TalkDuration: {type: GraphQLFloat},
    categorizeResult: {type: new GraphQLList(CategorizedTranscriptType)},
    updatedAt: {type: GraphQLInt},
    totalEmoScore: {type: GraphQLFloat},
    totalToneScore: {type: GraphQLFloat},
    abnormalEmotions: {
      type: new GraphQLList(EmotionType)
    },
    emotions: {
      type: new GraphQLList(EmotionType)
    },
    
    // rawSpeech: {
    //   type: RawSpeechType,
    //   resolve(parentValue, args){
    //     return db.rawSpeechGetForOperator(parentValue.cellphone);
    //   },
    // },
  })
});

module.exports = ProcessedSpeechType;