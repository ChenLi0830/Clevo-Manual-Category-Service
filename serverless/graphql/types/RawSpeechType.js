'use strict';

const db = require('../database');

const graphql = require('graphql'),
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLID = graphql.GraphQLID;

const RawSpeechType = new GraphQLObjectType({
  name: "RawSpeech",
  fields: () => ({
    fileName: {type: GraphQLString},
    transcribedAt: {type: GraphQLString},
    transcriptionText: {type: GraphQLString},
    categorizedCount: {type: GraphQLInt},
  })
});

module.exports = RawSpeechType;