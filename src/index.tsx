import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
// import ThemeProvider from 'react-bootstrap/ThemeProvider'
import App from './App'
import { AuthProvider } from './firebase/auth/AuthProvider';
import './custom.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
  </React.StrictMode>
)