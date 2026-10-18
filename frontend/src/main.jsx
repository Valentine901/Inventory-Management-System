import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

// context providers
import ToastContextProvider from "./context/ToastContext";
import AuthContextProvider from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthContextProvider>
      <ToastContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastContextProvider>
    </AuthContextProvider>
  </StrictMode>
  ,
)
