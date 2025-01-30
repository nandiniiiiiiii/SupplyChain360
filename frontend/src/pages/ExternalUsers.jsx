import React from 'react'
import Sidebar from '../component/Sidebar'

function ExternalUsers() {
  const menuitem = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Profile", link: "/profile" },
    { name: "Settings", link: "/settings" },
    { name: "Create New User", link: "/register" }
  ];

  return (
    <div className='flex'>
      <Sidebar menuItems={menuitem}/>
    <div>ExternalUsers</div>
    </div>
  )
}

export default ExternalUsers