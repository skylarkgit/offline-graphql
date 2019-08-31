import React, { useState } from "react";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Tasks from "./screens/Tasks";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import { persistCache } from "apollo-cache-persist";
import { resolvers } from "./resolvers/resolvers";

function App() {
  const cache = new InMemoryCache({});

  // persistCache({
  //   cache,
  //   storage: window.localStorage
  // }).then(() => {

  // });

  const client = new ApolloClient({
    link: new HttpLink({ uri: "https://graphql-pokemon.now.sh" }),
    cache: cache,
    resolvers: resolvers
  });
  const tasks = [
    { title: "asd", description: "asd", __typename: "Task" },
    { title: "asdx", description: "asdx", __typename: "Task" },
    { title: "asdd", description: "asdd", __typename: "Task" }
  ];
  client.writeData({ data: { tasks } });

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Tasks></Tasks>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default App;
