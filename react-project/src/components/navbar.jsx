import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './navbar.css';
import logo from '../images/logo.svg';
import * as AiIcons from 'react-icons/ai';
import DarkLightMode from './DarkLightMode';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Resume', path: '/resume' },
    { title: 'Projects', path: '/projects' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <div className="navbar" id="navbar">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src={logo} alt="logo" className="logo-img" />
            <div className="logo-text">
              <p>Samuel Kong | Fullstack and Software Developer</p>
            </div>
          </Link>
        </div>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: isOpen ? '0%' : '100%' }}
          transition={{ duration: 0.5 }}
          className="menu-container"
        >
          <div className="close-row">
            <AiIcons.AiOutlineCloseCircle
              className="close-button"
              onClick={toggleMenu}
              size={35}
            />
          </div>
          <div className="menu-items">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="dark-light-mode-container">
            <DarkLightMode />
          </div>
        </motion.div>
        <AiIcons.AiOutlineMenu
          className="menu-button"
          onClick={toggleMenu}
          size={30}
        />
      </div>
    </>
  );
};

export default Navbar;
