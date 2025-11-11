import React from "react";
import App from "../App";
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context';


const httpLink = new HttpLink({
  uri: "https://merng-server-p8s6.onrender.com/graphql",
    // uri:'http://localhost:5000/graphql'
});


const authLink = new SetContextLink((prevContext, currentContext) => {
  const token = localStorage.getItem("jwtToken");
  return {
    ...currentContext,
    headers: {
      ...currentContext.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function ApolloWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

