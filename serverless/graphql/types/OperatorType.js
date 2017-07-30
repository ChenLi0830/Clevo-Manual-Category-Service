'use strict';

const db = require('../database');

const graphql = require('graphql'),
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLID = graphql.GraphQLID;

const OperatorType = new GraphQLObjectType({
  name: "Operator",
  fields: () => ({
    id: {type: GraphQLID}, // cellphone
    cellphone: {type: GraphQLID},
    categorizedFileNames: {
      type: new GraphQLList(GraphQLString)
    },
  })
});

module.exports = OperatorType;