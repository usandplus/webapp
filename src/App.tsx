import './App.css';
import { Container } from 'react-bootstrap';
import UNPNavbar from './Components/unp/UNPNavbar';
import AppRoutes from './routes/Routes';
import { useAuthContext } from './firebase/auth/AuthProvider';

export default function App() {
  return (
    <div className="app-root">
      <div className="d-none d-lg-block sticky-top">
        <UNPNavbar  />
      </div>
      <div className="d-block d-lg-none">
        <UNPNavbar />
      </div>
      <Container fluid className="gx-0">
        <AppRoutes  />
      </Container>
    </div >
  );
}
