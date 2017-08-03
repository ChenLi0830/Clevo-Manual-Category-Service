'use strict';

const db = require('../database');
const SentenceType = require('./SentenceType');

const graphql = require('graphql'),
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLID = graphql.GraphQLID;

const SpeechType = new GraphQLObjectType({
  name: "Speech",
  fields: () => ({
    id: {type: GraphQLID},
    fileName: {type: GraphQLString},
    operatorId: {type: GraphQLID},
    needReverseSpeaker: {type: GraphQLBoolean},
    businessType: {type: new GraphQLList(GraphQLString)},
    sentenceList: {type: new GraphQLList(SentenceType)},
  })
});

module.exports = SpeechType;