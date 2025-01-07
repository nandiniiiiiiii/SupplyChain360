import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // Replace with your backend URL
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export default ApolloClientProvider;
