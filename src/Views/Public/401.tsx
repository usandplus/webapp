import React from 'react';
import { useNavigate } from 'react-router-dom';
import UNPButton from '../../Components/unp/UNPButton';
import { BiErrorCircle } from 'react-icons/bi';

const NotFound404: React.FC = () => {
  let navigate = useNavigate();

  return (
    <div className='text-center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <BiErrorCircle className='text-danger' size={96}/>
        <p>No tienes acceso a esta pagina.</p>
        <UNPButton onClick={() => navigate(-1)}>Regresar</UNPButton>
      </div>
    </div>
  );
}

export default NotFound404;