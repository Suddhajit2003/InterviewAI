import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewinterview from './_Components/AddNewinterview'

 function Dashboard() {
  return (
    <div className='p-10'>

      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and Start Ai Interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewinterview/>
      </div>
    </div>
  )
}

export default Dashboard
