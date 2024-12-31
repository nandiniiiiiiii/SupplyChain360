import React from 'react'
import Sidebar from '../component/Sidebar'

function FactoryManager() {
  return (
    <div className='flex'>
      <Sidebar/>
      <div>FactoryManager</div>
    </div>
  )
}

export default FactoryManager