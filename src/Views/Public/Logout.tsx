// src/views/LogoutView.tsx

import React, { useEffect, useState } from 'react';
import UNPButton from '../../Components/unp/UNPButton';
import UNPInput from '../../Components/unp/UNPInput';
import { signInWithGoogle, signInWithEmail, signOutUser } from '../../firebase/auth/authService';
import { redirect } from 'react-router-dom';

const LogoutView: React.FC = () => {

  useEffect(() => {
    signOutUser()
    window.location.href = '/'
  })
  return <></>
}

export default LogoutView;
