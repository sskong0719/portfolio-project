import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Socialbar from './components/socialLinks';
import Homepage from './pages/Homepage';
import Contact from './pages/contact';
import Projects from './pages/projects';
import Resume from './pages/resume';
import CursorFollower from './components/CursorFollower';

function App() {

  return (
    <>
      <Router>
        <CursorFollower />
        <Navbar />
        <Socialbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/resume' element={<Resume />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
