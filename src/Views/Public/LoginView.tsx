// src/views/LoginView.tsx

import React, { useState } from 'react';
import UNPButton from '../../Components/unp/UNPButton';
import UNPInput from '../../Components/unp/UNPInput';
import { signInWithGoogle, signInWithEmail } from '../../firebase/auth/authService';

const LoginView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    try {
      await signInWithEmail(email, password);
      // Redirect to Dashboard or handle success
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="login-view">
      <h1>Login</h1>
      <UNPInput
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <UNPInput
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <UNPButton label="Login" onClick={handleEmailLogin} />
      <UNPButton label="Login with Google" onClick={signInWithGoogle} />
    </div>
  );
};

export default LoginView;
