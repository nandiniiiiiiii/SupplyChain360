import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink  } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // Replace with your backend URL
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
  },
});

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
