import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { app, googleProvider } from './firebase'; // Import the googleProvider
import img from './images/IMG_8757.jpg';
import UserDetails from './UserDetails';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between login and signup

  const auth = getAuth(app);

  // Handle Google Sign-In
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setIsLoggedIn(true);
        setError('');
        const user = result.user;
        setUsername(user.displayName || user.email); // Set the username to user's display name or email
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Handle Signup (Email/Password)
  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, username, password)
      .then(() => {
        setIsLoggedIn(true);
        setError('');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Handle Login (Email/Password)
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        setIsLoggedIn(true);
        setError('');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Handle Logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="App-nav">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </header>

        <section className="App-photo">
          <img src={img} alt="Homepage Main" className="main-photo" />
        </section>

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/user-details" />
              ) : (
                <section className="App-login">
                  <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
                  <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
                    <div>
                      <label>Email:</label>
                      <input
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Password:</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
                  </form>
                  <button onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? 'Already have an account? Login' : 'New user? Sign Up'}
                  </button>
                  <button onClick={signInWithGoogle}>Sign In with Google</button>
                </section>
              )
            }
          />
          <Route path="/user-details" element={isLoggedIn ? <UserDetails /> : <Navigate to="/" />} />
        </Routes>

        {isLoggedIn && (
          <div>
            <h2>Welcome, {username}!</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

        <footer className="App-footer">
          <h2>References</h2>
          <ul>
            <li><a href="https://example.com">Reference 1</a></li>
            <li><a href="https://example.com">Reference 2</a></li>
            <li><a href="https://example.com">Reference 3</a></li>
          </ul>
        </footer>
      </div>
    </Router>
  );
}

export default App;
