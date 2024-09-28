import './App.css';
import myPhoto from './assets/images/my-photo.jpg';  // Adjust the path as needed

function App() {
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
          src={myPhoto}  // Using the imported image
          alt="Homepage Main" 
          className="main-photo" 
        />
      </section>

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
