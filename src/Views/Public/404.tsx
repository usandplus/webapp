import React from 'react';
import { useNavigate } from 'react-router-dom';
import UNPButton from '../../Components/unp/UNPButton';

const NotFound404: React.FC = () => {
  let navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <i className="fas fa-exclamation-triangle fa-4x"></i>
        <p>Oops! Something went wrong. The page you are looking for cannot be found.</p>
        <UNPButton onClick={() => navigate('/')}>Go Back to Home</UNPButton>
      </div>
    </div>
  );
}

export default NotFound404;