import React, { useRef, useEffect } from 'react';
import './styles/Homepage.css';
import Timi from '../images/Timi.jpg';

export default function Homepage() {
    const divRef = useRef(null);

    const handleScroll = (event) => {
        event.preventDefault();
        const target = document.querySelector('#About');
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth',
        });
    };

    useEffect(() => {

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
            <div className="section1">
                <div className="welcome" ref={divRef}>
                    <div className="welcome-title">
                        <span className='name'>Samuel Kong</span>
                        <br />
                        <span className="role">Fullstack Developer</span>
                    </div>
                    <div className="welcome-body">
                        Feel free to explore and don’t hesitate to get in touch if you have any questions or opportunities to collaborate
                    </div>
                </div>
                <a href="#About" onClick={handleScroll}>
                    <div className='scrollbox'>
                        <div className='scrolldown'>
                            <span className="scroll-text">SCROLL DOWN</span>
                            <div className="scroll-button" />
                        </div>
                    </div>
                </a>
            </div>
            <div className="section2">
                <div className="fake-anchor" id='About'></div>

                <div className='body'>
                    <img src={Timi} alt='Timi' />
                    <div className='about'>
                        <div className='header-about'>Hi, I'm Sam</div>
                        Recent graduate from the University at Buffalo with a <span className="major">B.S. in Computer Science</span>. Passionate Fullstack Developer . Dedicated to building innovative solutions and eager to contribute to dynamic teams. Explore my portfolio to see my projects and experiences. Let's connect and discuss how I can bring value to your organization.
                    </div>
                </div>
            </div>
        </>
    );
};