import React, { useEffect, useState } from 'react'
import Sidebar from '../component/Sidebar'
import Allrecords from '../component/Allrecords'
import DisplayRecord from '../component/DisplayRecord'
import { GET_INVENTORY } from '../queries/inventory.query.js';
import { useQuery } from '@apollo/client';

function FactoryManager() {
  const { loading, error, data } = useQuery(GET_INVENTORY);
  const [selectedRecord, setSelectedRecord] = useState("677e8fe1bdcd777fad9d38c1");
  const [inventory, setInventory] = useState([]);

  // Update inventory whenever data changes
  useEffect(() => {
    if (data?.getallproducts) {
      setInventory(data.getallproducts);
      console.log(inventory)
    }
  }, [data]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }
  const menuitem = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Profile", link: "/profile" },
    { name: "Settings", link: "/settings" },
    { name: "Create New User", link: "/register" }
  ];
  return (
    <div className='flex h-screen'>
      <Sidebar menuItems={menuitem}/>
      <div className='flex w-5/6'>
        <Allrecords inventory={inventory} setSelectedRecord={setSelectedRecord}/>
        <DisplayRecord record={selectedRecord}/>
      </div>
    </div>
  )
}

export default FactoryManager