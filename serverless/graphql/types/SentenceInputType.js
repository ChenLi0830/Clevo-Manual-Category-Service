'use strict';

const db = require('../database');

const graphql = require('graphql'),
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLInputObjectType = graphql.GraphQLInputObjectType,
    GraphQLID = graphql.GraphQLID;

const SentenceInputType = new GraphQLInputObjectType({
  name: "SentenceInput",
  fields: () => ({
    categoryName: {type: GraphQLString},
    fileNameBeginTime: {type: GraphQLString},
    operatorId: {type: GraphQLID},
    fileName: {type: GraphQLString},
    text: {type: GraphQLString},
    bg: {type: GraphQLString},
    ed: {type: GraphQLString},
    speaker: {type: GraphQLString},
  })
});

module.exports = SentenceInputType;