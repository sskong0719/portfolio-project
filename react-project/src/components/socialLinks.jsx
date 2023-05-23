import './socialLinks.css'
import React from 'react';
import { socialLinks } from './socialLinksData';

export default function Contact() {
  const handleLinkClick = (link) => {
    window.open(link);
  };

  return (
    <div className="social-container">
      <ul>
        {socialLinks.map((item, index) => (
          <li
            key={index}
            className={
              index === 0 ? 'first' : index === socialLinks.length - 1 ? 'last' : 'in-between'
            }
            onClick={() => handleLinkClick(item.link)}
          >
            {item.icon}
          </li>
        ))}
      </ul>
    </div>
  );
}
