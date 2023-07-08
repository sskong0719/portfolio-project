import React, { useState, useRef, useEffect } from 'react';
import './styles/projects.css';
import { resumeData } from './resumeData';

export default function Contact() {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);
    const popupRef = useRef();

    useEffect(() => {
        document.body.classList.remove('popup-open');

        const handleClickOutside = (event) => {
            const navbarElement = document.getElementById('navbar'); // Replace 'navbar' with the actual ID or class of your navbar element
            const clickedOnNavbar = navbarElement && navbarElement.contains(event.target);

            if (popupRef.current && !popupRef.current.contains(event.target) && !clickedOnNavbar) {
                setShowPopup(false);
                document.body.classList.remove('popup-open');
            }
        };

        const handleBeforeUnload = () => {
            document.body.classList.remove('popup-open');
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('beforeunload', handleBeforeUnload); // Add beforeunload event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('beforeunload', handleBeforeUnload); // Remove beforeunload event listener
        };
    }, []);

    const handleClick = (listing) => {
        setSelectedListing(listing);
        setShowPopup(true);
        document.body.classList.add('popup-open');
    };

    function Popup({ listing, onClose }) {
        return (
            <div ref={popupRef} className="popup">
                <div className="left-content">
                    <img src={listing.img} alt={listing.title} />
                </div>
                <div className="right-content">
                    <h1>{listing.title}</h1>
                    <br />
                    <h2>{listing.date}</h2>
                    <a href={listing.link} className="link" target="_blank" rel="noopener noreferrer">
                        View Project
                    </a>
                    <h3>Skills</h3>
                    <ul className="skills-list">
                        {listing.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                    <br />
                    <p>{listing.summary}</p>
                </div>
            </div>
        );
    }


    return (
        <>
            <div className="listings">
                {resumeData[0].Projects.map((project) => (
                    <div key={project.id} className="listing-card" onClick={() => handleClick(project)}>
                        <img src={project.img} alt={project.title} />
                        <h2>{project.title}</h2>
                    </div>
                ))}
            </div>
            {showPopup && <Popup listing={selectedListing} onClose={() => setShowPopup(false)} />}
        </>
    );
}
