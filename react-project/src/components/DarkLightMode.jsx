import React, { useState } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import './DarkLightMode.css'

const DarkLightMode = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.querySelector("body").setAttribute("data-theme", "dark");
            localStorage.setItem("selectedTheme", "dark")
        }
        else {
            document.querySelector("body").setAttribute("data-theme", "light");
            localStorage.setItem("selectedTheme", "light")
        }
    };

    // const selectedTheme = localStorage.getItem("selectedTheme");
    return (
        <div className={`dark-mode-switch ${isDarkMode ? 'dark' : ''}`}>
            <div className="toggle" onClick={handleToggle}>
                <div className={`slider ${isDarkMode ? 'dark' : ''}`}></div>
                {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
            </div>
        </div>
    );
};

export default DarkLightMode;
