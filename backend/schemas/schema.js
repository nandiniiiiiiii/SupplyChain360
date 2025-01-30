// schema.js
const { gql } = require('apollo-server-express');

exports.schema = gql`
  type Query {
    test: String!
    # here we will write the inventory queries
    getallproducts: [Inventory!]!
    getProductById(id: ID!): Inventory
  }

  type Inventory {
    id: ID!
    itemID: String!
    itemName: String!
    category: String!
    stockLevel: Int!
    reorderPoint: Int
    leadTime: Int
    supplierID: String
    supplierName: String
    pricePerUnit: String
    expiryDate: String
    location: String
    lastUpdated: String
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

