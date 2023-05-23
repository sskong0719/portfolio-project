import './styles/resume.css';
import React, { useEffect } from 'react';

export default function Resume() {
  useEffect(() => {
    document.body.classList.remove('popup-open');
  }, []);

  return (
    <>
      <div className="background">
        <div className="left"></div>
        <div className="right"></div>
        <div className="content"></div>
      </div>
      <div className="content">hi</div>
    </>
  );
}
