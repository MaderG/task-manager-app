import React from 'react'
import { UserContext } from '../context/UserContext'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
  const { login } = React.useContext(UserContext)
  
  
  if (!login) return <Navigate to='/login' />

  return (
    <div><Outlet /></div>
  )
}

export default PrivateRoute