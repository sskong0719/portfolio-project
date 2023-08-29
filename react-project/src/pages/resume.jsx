import './styles/resume.css';
import React, { useEffect, useState } from 'react';
import { resumeData } from './resumeData';

export default function Resume() {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    document.body.classList.remove('popup-open');
    const smoothScroll = (target) => {
      const element = document.querySelector(target);
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    };
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScroll(target);
      });
    });
  }, []);

  return (
    <>
      <div className="content">
        <div className="self">
          <h1>Samuel Kong</h1>
          <br />
          <div className='heading'>
            Currently a Senior at University at Buffalo working towards B.S. in Computer Science. Seeking Hands-On Experience in any
            computer science related field. I am motivated and willing to learn from others and share innovative ideas. I hope to learn and
            grow with the company.
          </div>
          <br />
          {<ul>
            <li>
              <a href="#Skills" className={activeLink === 'Skills' ? 'active' : ''} onClick={() => handleLinkClick('Skills')}>Skills</a>
            </li>
            <li>
              <a href="#Experience" className={activeLink === 'Experience' ? 'active' : ''} onClick={() => handleLinkClick('Experience')}>Experience</a>
            </li>
            <li>
              <a href="#Education" className={activeLink === 'Education' ? 'active' : ''} onClick={() => handleLinkClick('Education')}>Education</a>
            </li>
            <li>
              <a href="#Projects" className={activeLink === 'Projects' ? 'active' : ''} onClick={() => handleLinkClick('Projects')}>Projects</a>
            </li>
            <li>
              <a href="#Languages" className={activeLink === 'Languages' ? 'active' : ''} onClick={() => handleLinkClick('Languages')}>Languages</a>
            </li>
          </ul>}
          <h5> Feel free to get a copy of my resume</h5>
          <a className="pdf" href={process.env.PUBLIC_URL + '/SamuelSiuyinKong_Resume.pdf'} target="_blank" rel="noreferrer">View PDF</a>
        </div>
        <div className="resume">
          <div className="fake-anchor" id="Skills"></div>
          <h2>Skills</h2>
          <br />
          <ul className="skills-list">
            {resumeData.map((item, index) => (
              <li key={index}>
                {item.Skills.map((skill, skillIndex) => (
                  <div className="individual-skill" key={skillIndex}>
                    {skill.logo}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </li>
            ))}
          </ul>
          <br />
          {resumeData.map((item, index) => (
            <div className="projects" key={index}>
              <div className="fake-anchor" id="Experience"></div>
              <h2>Professional Experience</h2>
              {item.Experience.map((experience, i) => (
                <div className="individual-project" key={i}>
                  <br />
                  <h3>{experience.company} - {experience.title}</h3>
                  <h4>{experience.date}</h4>
                  <br />
                  <ul className="project-list">
                    {experience.description.map((desc, j) => (
                      <li className="description" key={j}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
          <br />
          {resumeData.map((item, index) => (
            <div className="projects" key={index}>
              <div className="fake-anchor" id="Education"></div>
              <h2>Education</h2>
              {item.Education.map((education, i) => (
                <div className="individual-project" key={i}>
                  <br />
                  <h3>{education.school} <br /><br />{education.degree}</h3>
                  <h4>{education.date}</h4>
                  <br />
                </div>
              ))}
            </div>
          ))}
          <br />
          {resumeData.map((item, index) => (
            <div className="projects" key={index}>
              <div className="fake-anchor" id="Projects"></div>
              <h2>Projects</h2>
              {item.Projects.map((project, i) => (
                <div className="individual-project" key={i}>
                  <br />
                  <h3>{project.title}</h3>
                  <h4>{project.date}</h4>
                  <br />
                  <ul className="project-list">
                    {project.description.map((desc, j) => (
                      <li className="description" key={j}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <br />
          <div className="fake-anchor" id="Languages"></div>
          <h2>Languages</h2>
          <br />
          <ul className="languages-list">
            {resumeData.map((item, index) => (
              <li key={index}>
                {item.Language.map((language, languageIndex) => (
                  <span key={languageIndex}>{language}</span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
