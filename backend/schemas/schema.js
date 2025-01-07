// schema.js
const { gql } = require('apollo-server-express');

exports.schema = gql`
  type Query {
    test: String!
  }
  
  type User {
    username: String!
    email: String!
    password: String!
    role: String!
  }

  type AuthPayload {
    message: String!
    token: String!
    user: User!
  }

type LogoutResponse {
  success: Boolean!
  message: String!
}

  type Mutation {
    register(username: String!, email: String!, password: String!, role: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: LogoutResponse!
  }

`;

