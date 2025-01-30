import React from 'react'

function Allrecords({ inventory, setSelectedRecord }) {
  return (
    <div className="w-64 bg-gray-100 p-4 border-r h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Inventory Sidebar</h2>
      <ul>
        {inventory.map((item) => (
          <li
            key={item.id}
            onClick={() => setSelectedRecord(item.id)} // Set selected record on click
            className="bg-white p-2 rounded-lg shadow mb-2 hover:bg-gray-200 cursor-pointer"
          >
            <h3 className="font-semibold">{item.itemName}</h3>
            <p className="text-sm text-gray-500">Stock: {item.stockLevel}</p>
          </li>
        ))}
      </ul>
    </div>)
}

export default Allrecords