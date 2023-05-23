import React, { useState, useEffect, useRef } from 'react';
import './CursorFollower.css';
import './navbar.css';

const CursorFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const cursorRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const newX = event.clientX;
            const newY = event.clientY;

            setTimeout(() => {
                setPosition({ x: newX, y: newY });
            }, 100);
        };

        const handleMouseClick = () => {
            if (cursorRef.current) {
                cursorRef.current.classList.add('clicked');
                setTimeout(() => {
                    cursorRef.current.classList.remove('clicked');
                }, 500);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleMouseClick);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('click', handleMouseClick);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="cursorFollower"
            style={{
                position: 'fixed',
                left: position.x - 25,
                top: position.y - 25,
            }}
        />
    );
};

export default CursorFollower;
