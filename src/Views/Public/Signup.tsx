// src/views/SignupView.tsx

import React, { useState } from 'react';
import UNPButton from '../../Components/unp/UNPButton';
import UNPInput from '../../Components/unp/UNPInput';
import { signUpWithEmail } from '../../firebase/auth/authService';

const SignupView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await signUpWithEmail(email, password);
      // Handle successful signup
    } catch (error) {
      console.error("Signup failed: ", error);
    }
  };

  return (
    <div className="signup-view">
      <h1>Sign Up</h1>
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
      <UNPInput
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <UNPButton label="Sign Up" onClick={handleSignup} />
    </div>
  );
};

export default SignupView;
