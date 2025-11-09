import React from "react";
import App from "../App";
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';


const httpLink = new HttpLink({
  uri: "https:merng-server-p8s6.onrender.com", // ✅ Usually includes /graphql
});

// Use the deployed backend in production, localhost in development
// const GRAPHQL_URI =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:5000/graphql"
//     : "https://merng-server-p8s6.onrender.com/graphql";

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken')
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ""
      }
    }
})

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
