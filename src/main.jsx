import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { FilterProvider } from './context/FilterContext.jsx'
import { ScrollToTop } from './Components/index.js'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CartProvider>
      <FilterProvider>
        <ScrollToTop/>
        <ToastContainer  autoClose={5000} position={"top-right"}/>
        <App/>
      </FilterProvider>
    </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
