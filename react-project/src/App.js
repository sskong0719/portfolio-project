import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Socialbar from './components/socialLinks';
import Homepage from './pages/Homepage';
import Contact from './pages/contact';
import Projects from './pages/projects';
import Admin from './pages/admin';
import Resume from './pages/resume';
import NotFound from './pages/NotFound';
import CursorFollower from './components/CursorFollower';
import { isBrowser, isMobile } from 'react-device-detect';

function ScrollReset()
{
    // extract pathname property from location object
    const { pathname } = useLocation();

    useEffect(() =>
    {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App()
{
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

function AppContent()
{
    const location = useLocation();
    const isPDFRoute = location.pathname === '/SamuelSiuyinKong_Resume.pdf';

    useEffect(() => {
        fetch('/')
            .then(response => response.json())
            .then(data => {
                console.log("Backend response:", data);
            })
            .catch(error => {
                console.error("Error fetching from backend:", error);
            });
    }, []);
    
    return (
        <>
            <ScrollReset />
            {!isPDFRoute && (
                <>
                    <Navbar />
                    {isBrowser && <Socialbar />}
                </>
            )}
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/resume' element={<Resume />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
