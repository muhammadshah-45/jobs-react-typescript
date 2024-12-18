import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { Provider } from 'react-redux';
import {Store} from './redux/Store.js'
import { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
<Provider store={Store}>
  
    <Toaster/>
    <App />
  </Provider>  
   
  </StrictMode>,
)
