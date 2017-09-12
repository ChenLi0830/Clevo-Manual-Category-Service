import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

// Production
const link = "https://3n5kqg5l9c.execute-api.us-west-2.amazonaws.com/production";

// Staging
// const link = "https://aq9i785i63.execute-api.us-west-2.amazonaws.com/staging";

// Dev
// const link = "https://el9pqobs08.execute-api.us-west-2.amazonaws.com/dev";

function graphQLFetcher(graphQLParams) {
  return fetch(link + '/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

ReactDOM.render(<GraphiQL fetcher={graphQLFetcher} />, document.body);
