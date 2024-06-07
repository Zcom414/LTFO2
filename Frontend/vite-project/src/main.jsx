import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/assets/scss/index.scss'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// import AuthProvider from './context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    <ToastContainer draggable theme="dark" autoClose="3000" />
    </BrowserRouter>
  </React.StrictMode>,
)
