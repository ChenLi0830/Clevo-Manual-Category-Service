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

const ProcessedSpeechType = new GraphQLObjectType({
  name: "ProcessedSpeech",
  fields: () => ({
    id: {type: GraphQLID}, // cellphone
    fileName: {type: GraphQLString},
    totalEmoScore: {type: GraphQLFloat},
    totalToneScore: {type: GraphQLFloat},
    duration: {type: GraphQLFloat},
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