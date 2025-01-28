import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from './components/theme-provider'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <PersistGate loading={<div>
          ...Loading
        </div> } persistor={persistor} ><App/></PersistGate>
      </Provider>
       </ThemeProvider>
      </ BrowserRouter>
    

  
  </StrictMode>,
)
