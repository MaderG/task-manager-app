import React from 'react'
import fetcher from '../services/api.js'

export const UserContext = React.createContext()

const UserProvider = ({ children }) => {
  const [data, setData] = React.useState(null)
  const [login, setLogin] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [storage, setStorage] = React.useState('')

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }


  const updateUser = React.useCallback(async (reqUser) => {
    try {
      const response = await fetcher.patch(`/api/users/${reqUser.id}`, reqUser);
      const { token, user } = response;
      window[storage].setItem('token', token);
      setData(user);
    } catch (err) {
      setError(err);
    }
  }, []);

  const getUser = React.useCallback(async (token) => {
    try {
      const { user } = parseJwt(token)
      await fetcher(`/api/users/${user.id}`)
      setData(user)
      setLogin(true)
    } catch (err) {
      setError(err)
      userLogout()
    } finally {
      setLoading(false)
    }
  }, [])

  async function userLogin(email, password, rememberMe) {
    try {
      setError(null)
      setLoading(true)
      const response = await fetcher.post('/api/auth', { email, password })
      const { token } = response
      if (rememberMe) {
        window.localStorage.setItem('token', token)
        setStorage('localStorage')
      } else {
        window.sessionStorage.setItem('token', token)
        setStorage('sessionStorage')
      }
      await getUser(token)
      return { ok: true }
    } catch (err) {
      setError(err.cause)
      setLogin(false)
      throw err
    } finally {
      setLoading(false)
    }
  }



  const userLogout = React.useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
    setLogin(false)
    window.localStorage.removeItem('token')
    window.sessionStorage.removeItem('token')
  }, [])

  React.useEffect(() => {
    async function autoLogin() {
      const jwt = window.localStorage.getItem('token') || window.sessionStorage.getItem('token')
      if (jwt) {
        try {
          setError(null)
          setLoading(true)
          await getUser(jwt)
          setLogin(true)
        } catch (err) {
          userLogout()
        }
      } else {
        setLogin(false)
        setLoading(false)
      }
    }

    autoLogin()
  }, [userLogout, getUser])

  return (
    <UserContext.Provider value={{ userLogin, userLogout, updateUser, error, data, login, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
