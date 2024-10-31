import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import './index.css'
import 'preline'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer position='top-center' />
  </>
)
