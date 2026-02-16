import React from 'react'
import Header from './Header'

const Dashboardlayout = ({children}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default Dashboardlayout
