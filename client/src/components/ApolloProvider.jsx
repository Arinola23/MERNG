import React from "react";
import App from "../App";
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context';


const httpLink = new HttpLink({
   uri: "https:merng-server-p8s6.onrender.com", // ✅ Usually includes /graphql
    // uri:'http://localhost:5000'
});


// const authLink = setContextLink(() => {
//   const token = localStorage.getItem('jwtToken')
//     return {
//       headers: {
//         Authorization: token ? `Bearer ${token}` : ""
//       }
//     }
// })

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
