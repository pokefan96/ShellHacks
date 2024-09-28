import React, { useState } from 'react';
import './App.css';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from './firebase'; // Import Firebase app
import img from './images/IMG_8757.jpg'; // Adjust the path as needed

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between login and signup

  const auth = getAuth(app);

  // Handle Signup
  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed up successfully
        setIsLoggedIn(true);
        setError('');
      })
      .catch((error) => {
        // Handle signup errors
        setError(error.message);
      });
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in successfully
        setIsLoggedIn(true);
        setError('');
      })
      .catch((error) => {
        // Handle login errors
        setError(error.message);
      });
  };

  // Handle Logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="App">
      {/* Tab bar at the top */}
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

      {/* Photo in the middle */}
      <section className="App-photo">
        <img 
          src={img}  // Use 'img' since that's the imported variable
          alt="Homepage Main" 
          className="main-photo" 
        />
      </section>

      {/* Conditional rendering based on login status */}
      {!isLoggedIn ? (
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
        </section>
      ) : (
        <div>
          {/* Photo in the middle */}
          <section className="App-photo">
            <img 
              src={img}  // Use 'img' since that's the imported variable
              alt="Homepage Main" 
              className="main-photo" 
            />
          </section>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* References at the bottom */}
      <footer className="App-footer">
        <h2>References</h2>
        <ul>
          <li><a href="https://example.com">Reference 1</a></li>
          <li><a href="https://example.com">Reference 2</a></li>
          <li><a href="https://example.com">Reference 3</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
