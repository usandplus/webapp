import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, ScrollRestoration } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
// import ThemeProvider from 'react-bootstrap/ThemeProvider'
import App from './App'
import { AuthProvider } from './firebase/auth/AuthProvider';
import './custom.scss';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
)