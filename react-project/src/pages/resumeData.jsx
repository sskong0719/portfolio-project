import * as SiIcons from 'react-icons/si';
import * as GrIcons from 'react-icons/gr';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import pythonLogo from '../images/python-logo-only.svg'
import css3Logo from '../images/css3.svg'
import figmaLogo from '../images/figma.svg'
import mysqlLogo from '../images/mysql.svg'
import html5Logo from '../images/html5.svg'
import RESTLogo from '../images/rest-api-icon.svg'
import houseFinder from '../images/housefinder.jpg';
import sklogo from '../images/logo.svg';
import jbay from '../images/jbay.jpg';
import noImage from '../images/no-image.png';
import armLogo from '../images/ArmLogo.svg';

/* Programming Languages*/
let python = <img src={pythonLogo} className="tech-icon" width="40" height="40" alt="Python Logo" />;
let php = <SiIcons.SiPhp className="tech-icon" size={40} color='#787CB5' />;
let arm = <img src={armLogo} className="tech-icon" width="40" height="40" alt="ARM Assembly Logo" />;
let c = <SiIcons.SiC className="tech-icon" size={40} />;

/* Databases */
let mysql = <img src={mysqlLogo} className="tech-icon" width="40" height="40" alt="MySQL Logo" />;
let mongodb = <SiIcons.SiMongodb className="tech-icon" size={40} color='#27C937' />;

/* Front-End Technologies */
let html5 = <img src={html5Logo} className="tech-icon" width="40" height="40" alt="HTML5 Logo" />;
let css3 = <img src={css3Logo} className="tech-icon" width="40" height="40" alt="CSS3 Logo" />;
let reactjs = <GrIcons.GrReactjs className="tech-icon" size={40} color='#61dbfb' />;

/* Framework / Libraries */
let flask = <SiIcons.SiFlask className="tech-icon" size={40} />;
let REST = <img src={RESTLogo} className="tech-icon" width="40" height="40" alt="RESTAPI Logo" />;

/* Tools */
let figma = <img src={figmaLogo} className="tech-icon" width="40" height="40" alt="Figma Logo" />;
let github = <AiIcons.AiFillGithub className="tech-icon" size={40} />;
let docker = <FaIcons.FaDocker className="tech-icon" size={40} color='#2FAFF4' />;
let nginx = <SiIcons.SiNginx className="tech-icon" size={40} color='#009900' />;
let ubuntu = <FaIcons.FaUbuntu className="tech-icon" size={40} color='#E95420' />;


export const resumeData = [
    {
        Skills: [
            { name: 'Python', logo: python },
            { name: 'C', logo: c},
            { name: 'PHP', logo: php },
            { name: 'CSS3', logo: css3 },
            { name: 'HTML5', logo: html5 },
            { name: 'ReactJS', logo: reactjs },
            { name: 'MySQL', logo: mysql },
            { name: 'MongoDB', logo: mongodb },
            { name: 'Flask', logo: flask },
            { name: 'Figma', logo: figma },
            { name: 'GitHub', logo: github },
            { name: 'Docker', logo: docker },
            { name: 'RESTful API', logo: REST },
            { name: 'NGINX', logo: nginx },
            { name: 'Ubuntu', logo: ubuntu },
            { name: 'ARM Assembly', logo: arm }
        ],
        Experience: [
            {
                id: 1,
                company: "Tatum Games, LLC",
                title: "Web Developer Intern",
                skills: [php, html5, css3],
                date: "July 2023 - October 2023",
                description: [
                    "Developed and maintained the frontend of the MIKROS SaaS platform using HTML, CSS, and PHP, contributing to improving user experience and page load times.",
                    "Collaborated with a remote team using Slack and GitHub for daily updates and project management.",
                    "Ensured the stability of the existing codebase by resolving bugs and implementing best coding practices"
                ]
            }
        ],
        Education: [
            {
                id: 1,
                school: "University at Buffalo, NY",
                degree: "Computer Science Bachelor of Science",
                date: "August 2021 - May 2024",
                description: ["UB Hackathon Fall 2023", "Played a role as team captain and fullstack dev. Completed the the project within 24 hours. Very fun experience.", "Key Coursework: Machine Learning, Data Structures, Web Development, Algorithms, AI Fundamentals"]
            }
        ],
        Projects: [
            {
                id: 1,
                img: sklogo,
                title: "SK Portfolio Website",
                skills: [flask, python, reactjs, css3, github, docker, nginx, mongodb, ubuntu],
                summary: "This portfolio website was created to showcase my skills. It is frontend heavy and only has one backend feature (\"SMTP\") for sending emails in the Contact page, I will be adding more project to demonstrate what I have learnt so far.",
                date: "May 2023 - July 2023",
                link: 'https://samuelkong.dev/',
                description: [
                    "Developed a personal portfolio site using ReactJS and Python, showcasing full-stack projects with a dynamic and responsive UI. ",
                    "Focused on intuitive navigation and a modern aesthetic to highlight frontend and backend development skills.",
                    "Utilizing Docker, Nginx, and Certbot for containerization, web server management, and SSL certification.",
                    "I will be adding more fun projects to showcase my skills!"
                ]
            }, {
                id: 2,
                img: houseFinder,
                title: "Campus Living Rating Web App",
                skills: [php, mysql, reactjs, css3, github, figma],
                summary: "During my senior year at the University at Buffalo, I developed this project for my CSE 442 Software Engineering course. The primary objective of this project was to assess and compare all available on-campus housing choices, ultimately delivering the most suitable housing option for users.",
                date: "February 2023 – May 2023",
                link: 'https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442h/',
                description: [
                    "Built a housing interactive web app using ReactJS and PHP, allowing user interactions like account creation and ratings. ",
                    "Used MySQL for data storage, with features for favorites and profile picture uploads to enhance user engagement.",
                    "Collaborated with teammates using Zenhub for project management and GitHub for version control, ensuring efficient workflow and communication."
                ]
            }, {
                id: 3,
                img: jbay,
                title: "Auction House Web App",
                skills: [python, mongodb, reactjs, css3, github, figma, docker, flask],
                summary: "This project was created during my senior year at University at Buffalo for CSE 312 Introduction to Web Applications. The primary objective of this project was to demonstrate my understanding and application of various concepts covered in the course. These concepts included websockets, security measures, cookie handling, data management, parsing HTTP headers, and establishing TCP connections.",
                date: "March 2023 – May 2023",
                link: 'https://www.youtube.com/watch?v=3B_hgpQ0coE&ab_channel=JourneySpratt/',
                description: [
                    "Developed an eBay-style app with ReactJS and Python/Flask, featuring real-time auction capabilities and detailed product listings.",
                    "Created dynamic profiles with MongoDB, and integrated WebSockets for live updates to boost user interaction.",
                    "Implemented password hashing and HTML injection prevention for robust data protection"
                ]
            }, {
                id: 4,
                img: noImage,
                title: "Brick Breaker Game Project",
                skills: [arm],
                summary: "",
                date: "April 2023 – May 2023",
                link: '',
                description: [
                    "Designed and developed a Brick Breaker game using ARM Assembly language and low-level hardware programming techniques such as GPIO, Timer, and UART.",
                    "Implemented GPIO to control input/output operations, Timer for game mechanics and frame rate control, and UART to display score and other game information on a serial terminal.",
                    "Challenges encountered during the development process were mostly optimizing performance and calculation challenges for the ball and paddle to move accurately and smoothly."
                ]
            }
        ],
        Language: ["Chinese", "Cantonese", "English"]
    }
];
