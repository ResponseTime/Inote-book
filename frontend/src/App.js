import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteSate from './context/notes/Notestate';
import Alert from './components/Alert';
function App() {
  return (
    <>
      <NoteSate>
        <Router>
          <Navbar />
          <Alert message="msg" />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteSate>
    </>
  );
}

export default App;
