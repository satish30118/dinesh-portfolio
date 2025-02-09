import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position="bottom-right"
      autoClose={5000}
      closeOnClick={false}
      draggable
      pauseOnHover
      theme="light"
      />
  </StrictMode>,
)
