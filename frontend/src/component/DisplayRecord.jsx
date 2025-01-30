import React, { useEffect } from 'react'
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../queries/inventory.query.js";

function DisplayRecord({ record }) {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: record },  // Passing the ID dynamically
    skip: !record,  // Skips query execution if no ID is selected
  });

  useEffect(() => {
    if (record) {
      refetch({ id: record });  // Refetch data when record changes
    }
  }, [record, refetch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;
  if (data) {
    console.log(data.getProductById)
  }

  return (
    <div className="w-[calc(100%-16rem)] p-4 border-r">
      <h2 className="text-xl font-bold">Product List</h2>
      <div className='p-4'>
        <h1 className='text-xl'><u>Product Name: {data.getProductById.itemName}</u></h1>
        <div className='p-2'>
        <h3>category: {data.getProductById.category}</h3>
        <h3>Supplier Name: {data.getProductById.supplierName}</h3>
        </div>
      </div>
    </div>
  )
}

export default DisplayRecord