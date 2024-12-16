import './App.css';
import { Container } from 'react-bootstrap';
import UNPNavbar from './Components/unp/UNPNavbar';
import AppRoutes from './routes/Routes';
import { useAuthContext } from './firebase/auth/AuthProvider';
import { useEffect, useState } from 'react';
import UNPSpinner from './Components/unp/UNPSpinner';

export default function App() {
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFirstLoad(false)
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="app-root">
      <div className="d-none d-lg-block sticky-top">
        <UNPNavbar />
      </div>
      <div className="d-block d-lg-none">
        <UNPNavbar />
      </div>
      <Container fluid id='content' className="gx-0">
        {/* {
          firstLoad
            ? <UNPSpinner fullScreen />
            : <AppRoutes />
            } */}
             <AppRoutes />
      </Container>
    </div >
  );
}
