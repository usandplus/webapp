import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
// import ThemeProvider from 'react-bootstrap/ThemeProvider'
import App from './App'
import FirebaseProvider from './Utils/Firebase'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FirebaseProvider>
      <Router>
        {/* <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs"
        > */}
          <App />
        {/* </ThemeProvider> */}
      </Router>
    </FirebaseProvider>
  </React.StrictMode>
)