// src/components/SignIn.js

import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
