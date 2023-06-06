import React, { useEffect, useState } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import './DarkLightMode.css';

const DarkLightMode = () => {
    const [isLightMode, setisLightMode] = useState(false);

    useEffect(() => {
        const selectedTheme = localStorage.getItem('selectedTheme');
            
        if (selectedTheme === 'light') {
            setisLightMode(true);
            document.querySelector('body').setAttribute('data-theme', 'light');
        } else {
            setisLightMode(false);
            document.querySelector('body').setAttribute('data-theme', 'dark');
        }
    }, []);

    const handleToggle = () => {
        setisLightMode(!isLightMode);
        if (!isLightMode) {
            document.querySelector('body').setAttribute('data-theme', 'light');
            localStorage.setItem('selectedTheme', 'light');
        } else {
            document.querySelector('body').setAttribute('data-theme', 'dark');
            localStorage.setItem('selectedTheme', 'dark');
        }
    };

    return (
        <div className={`dark-mode-switch ${isLightMode ? '' : 'dark'}`}>
            <div className="toggle" onClick={handleToggle}>
                <div className={`slider ${isLightMode ? '' : 'dark'}`}></div>
                {!isLightMode ? <MdDarkMode /> : <MdLightMode />}
            </div>
        </div>
    );
};

export default DarkLightMode;
