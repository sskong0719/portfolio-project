import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Socialbar from './components/socialLinks';
import Homepage from './pages/Homepage';
import Contact from './pages/contact';
import Projects from './pages/projects';
import Resume from './pages/resume';
import NotFound from './pages/NotFound';
import CursorFollower from './components/CursorFollower';
import { isBrowser, isMobile } from 'react-device-detect';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isPDFRoute = location.pathname === '/SamuelSiuyinKong_Resume.pdf';

  return (
    <>
      {!isPDFRoute && (
        <>
          {isBrowser && <CursorFollower />}
          <Navbar />
          <Socialbar />
        </>
      )}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/resume' element={<Resume />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
