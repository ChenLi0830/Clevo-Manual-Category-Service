'use strict';

const db = require('../database');

const graphql = require('graphql'),
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLFloat = graphql.GraphQLFloat,
    GraphQLList = graphql.GraphQLList,
    GraphQLString = graphql.GraphQLString,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLID = graphql.GraphQLID;

const ToneType = new GraphQLObjectType({
  name: "Tone",
  fields: () => ({
    Group: {type: GraphQLString},
    Value: {type: GraphQLFloat},
  })
});

const MoodType = new GraphQLObjectType({
  name: "Mood",
  fields: () => ({
    Composite: {type: MoodGroupType},
    Group11: {type: MoodGroupType},
    Group21: {type: MoodGroupType},
  })
});

const MoodGroupType = new GraphQLObjectType({
  name: "MoodGroup",
  fields: () => ({
    Primary: {type: MoodSubGroupType},
    Secondary: {type: MoodSubGroupType},
  })
});

const MoodSubGroupType = new GraphQLObjectType({
  name: "MoodSubGroup",
  fields: () => ({
    Phrase: {type: GraphQLString},
    Id: {type: GraphQLID},
  })
});

const AnalysisType = new GraphQLObjectType({
  name: "Analysis",
  fields: () => ({
    Arousal: {type: ToneType},
    Temper: {type: ToneType},
    Valence: {type: ToneType},
    Mood: {type: MoodType},
  })
});


const EmotionType = new GraphQLObjectType({
  name: "Emotion",
  fields: () => ({
    analysis: {type: AnalysisType},
    offset: {type: GraphQLInt},
    duration: {type: GraphQLInt},
  })
});

module.exports = EmotionType;