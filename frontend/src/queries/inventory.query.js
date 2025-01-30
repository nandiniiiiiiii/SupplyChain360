import { gql } from "@apollo/client";

export const GET_INVENTORY = gql`
  query GetAllProducts {
    getallproducts {
      id
      itemID
      itemName
      category
      stockLevel
      reorderPoint
      leadTime
      supplierID
      supplierName
      pricePerUnit
      expiryDate
      location
      lastUpdated
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
      id
      itemID
      itemName
      category
      stockLevel
      reorderPoint
      leadTime
      supplierID
      supplierName
      pricePerUnit
      expiryDate
      location
      lastUpdated
    }
  }
`;