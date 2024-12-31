import React from 'react'
import Header from './_Components/Header'

function DashboardLayout ({children}){
  return(
    <div>
      <Header></Header>
      {children}
    </div>
  )
}

export default DashboardLayout