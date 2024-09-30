import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Client from './Client';

const Clients = () => {
  console.log('hi')
  return (
    <Routes>
      <Route path=":category" element={<Home />} />
      <Route path=":category/:clientId" element={<Client />} />
    </Routes>
  );
}

export default Clients;