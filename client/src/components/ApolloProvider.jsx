import React from "react";
import App from "../App";
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'


const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql", // ✅ Usually includes /graphql
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function ApolloWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

// import React from "react"
// import App from './App'
// import { ApolloProvider } from '@apollo/client/react';
// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

// const httpLink = new HttpLink({
//     uri: 'http://localhost:5000'
// })

// const client = new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache()
// })

// export default (
//     <ApolloProvider client={client}>
//         <App/>
//     </ApolloProvider>
// )

// ApolloProvider.jsx
