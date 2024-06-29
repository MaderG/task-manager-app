import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import UserProvider from './context/UserContext'
import { SWRConfig } from 'swr'
import fetcher from './services/api.js'

const CACHE_KEY = 'swr-cache-key'

function localStorageProvider() {
  const map = new Map(JSON.parse(localStorage.getItem(CACHE_KEY)) || [])

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem(CACHE_KEY, appCache)
  })

    return map
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <SWRConfig value={{ fetcher, provider: localStorageProvider }}>
  <UserProvider>
  <ChakraProvider>
    <App />
  </ChakraProvider>
  </UserProvider>
  </SWRConfig>  
)
