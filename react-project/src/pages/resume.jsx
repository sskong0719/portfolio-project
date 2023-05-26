import './styles/resume.css';
import React, { useEffect } from 'react';

export default function Resume() {
  useEffect(() => {
    document.body.classList.remove('popup-open');
  }, []);

  return (
    <>
      <div className="content">
        <div className="self">
          <h1>Samuel Kong</h1>
          <br />
          <p>
            Currently a Senior at University at Buffalo working towards B.S. in Computer Science. Seeking Hands-On Experience in any
            computer science related field. I am motivated and willing to learn from others and share innovative ideas. I hope to learn and
            grow with the company.
          </p>
          <br />
          <ul>
            <li>Skills</li>
            <li>Projects</li>
            <li>Language</li>
            <li>Experience</li>
          </ul>
        </div>
        <div className="resume">
          <h2>Skills</h2>
          <br />
          <p>
            asd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f f
          </p>
          <br />
          <h2>Projects</h2>
          <br />
          <p>
            asd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f f
          </p>
          <br />
          <h2>Language</h2>
          <br />
          <p>
            asd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f f
          </p>
          <br />
          <h2>Experience</h2>
          <br />
          <p>
            asd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f fasd f f
          </p>
        </div>
      </div>
    </>
  );
}
