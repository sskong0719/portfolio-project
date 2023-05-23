import React, { useRef, useEffect } from 'react';
import './styles/Homepage.css';

const Homepage = () => {
    const divRef = useRef(null);

    useEffect(() => {
        document.body.classList.remove('popup-open');
        const handleMouseMove = (event) => {
            const div = divRef.current;
            if (div) {
                const { clientX, clientY } = event;
                const { left, top, width, height } = div.getBoundingClientRect();
                const x = clientX - (left + width / 2);
                const y = clientY - (top + height / 2);

                // Check if the cursor is outside the page
                const isCursorOutsidePage = (
                    clientX <= 0 ||
                    clientX >= window.innerWidth ||
                    clientY <= 0 ||
                    clientY >= window.innerHeight
                );

                if (isCursorOutsidePage) {
                    div.style.transition = 'transform 0.5s ease'; // Apply transition
                    div.style.transform = 'translate(0, 0)';
                } else {
                    div.style.transition = 'transform 0.1s ease'; // Apply transition
                    div.style.transform = `translate(${x / 30}px, ${y / 30}px)`;
                }
            }
        };


        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    return (
        <>
            <div className="body1">
                <div className="welcome" ref={divRef}>
                    <div className="welcome-title">
                        Hi I'm Samuel Kong.
                        <br />
                        <span className="role">Fullstack & Software Developer.</span>
                    </div>
                    <div className="welcome-body">
                        A senior student studying <span className="major">Computer Science.</span>
                        <br />
                        Feel free to explore and don’t hesitate to get in touch if you have any questions or opportunities to collaborate.
                    </div>
                </div>
            </div>
            <div className="body2">
                MORE ABOUT ME
            </div>
        </>
    );
};

export default Homepage;