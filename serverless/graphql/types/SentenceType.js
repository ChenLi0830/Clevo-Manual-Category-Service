'use strict';

const db = require('../database');

const graphql = require('graphql'),
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLID = graphql.GraphQLID;

const SentenceType = new GraphQLObjectType({
  name: "Sentence",
  fields: () => ({
    id: {type: GraphQLID},
    categoryName: {type: GraphQLString},
    fileNameWithBeginTime: {type: GraphQLString},
    operatorId: {type: GraphQLID},
    fileName: {type: GraphQLString},
    text: {type: GraphQLString},
    bg: {type: GraphQLString},
    ed: {type: GraphQLString},
    speaker: {type: GraphQLString},
  })
});

module.exports = SentenceType;