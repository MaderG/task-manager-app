import {Routes, Route, BrowserRouter } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Home from './pages/Home'
import RegisterRoute from './routes/RegisterRoute'
import Header from './Header'
import PrivateRoute from './routes/PrivateRoute'
import Dashboard from './pages/Profile/Dashboard'
import React from 'react'
import { UserContext } from './context/UserContext'
import History from './pages/Profile/History'
import Footer from './pages/Components/Footer'
import Profile from './pages/Profile/Profile'
import ChangePassword from './pages/Profile/ChangePassword'
import { Spinner } from '@chakra-ui/react'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'

const App = () => {

  const { loading } = React.useContext(UserContext)


  if(loading) return <Spinner />

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route element={<Home />} path='/' />
      <Route element={<RegisterRoute />}>
        <Route element={<SignIn />} path='/login' />
        <Route element={<SignUp />} path='/register' />
        <Route element={<ForgotPassword />} path='/forgot-password' />
        <Route element={<ResetPassword />} path='/reset-password' />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<Dashboard />} path='/dashboard' />
        <Route element={<History />} path='/history' />
        <Route element={<Profile />} path='/profile' />
        <Route element={<ChangePassword />} path='/profile/change-password' />
      </Route>
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App