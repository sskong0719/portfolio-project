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
let python = <img src={pythonLogo} width="40" height="40" alt="Python Logo" />;
let php = <SiIcons.SiPhp size={40} color='#787CB5' />;
let arm = <img src={armLogo} width="40" height="40" alt="ARM Assembly Logo" />;
let c = <SiIcons.SiC size={40}/>;

/* Databases */
let mysql = <img src={mysqlLogo} width="40" height="40" alt="MySQL Logo" />;
let mongodb = <SiIcons.SiMongodb size={40} color='#27C937' />;

/* Front-End Technologies*/
let html5 = <img src={html5Logo} width="40" height="40" alt="HTML5 Logo" />;
let css3 = <img src={css3Logo} width="40" height="40" alt="CSS3 Logo" />;
let reactjs = <GrIcons.GrReactjs size={40} color='#61dbfb' />;

/* Framework / Libraries*/
let flask = <SiIcons.SiFlask size={40} />;
let REST = <img src={RESTLogo} width="40" height="40" alt="RESTAPI Logo" />;

/* Tools*/
let figma = <img src={figmaLogo} width="40" height="40" alt="Figma Logo" />;
let github = <AiIcons.AiFillGithub size={40} />;
let docker = <FaIcons.FaDocker size={40} color='#2FAFF4' />;
let nginx = <SiIcons.SiNginx size={40} color='#009900' />;
let ubuntu = <FaIcons.FaUbuntu size={40} color='#E95420' />

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
                    "Collaborated with a small team of software engineers and senior software engineer to enhance the user experience and page load times of the MIKROS mobile game analytics SaaS product.",
                    "Assisted in addressing critical issues, stabilizing the product, and resolving bugs to ensure smooth functionality.",
                    "Actively participated in two-week Sprints, providing daily updates in the company's Slack channel and adhering to best practices for efficient communication.",
                    "Demonstrated flexibility by creating a self-defined work schedule while coordinating with team members for meetings and discussions. "
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
                    "Developed a fully functional portfolio website using ReactJS, Python, and MongoDB",
                    "Frontend heavy website, designed a clean and simple interface for users to learn more about me",
                    "Only backend function is using SMTP to send email",
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
                    "Developed a fully functional web app using ReactJS, PHP, and MySQL.",
                    "Implemented a rating system that allows users to rate various aspects of on and off-campus housing options.",
                    "Designed an intuitive and user-friendly interface that makes it easy for users to submit reviews and browse housing options."
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
                    "In progress for developing an eBay-like auction web app using ReactJS, Flask, Python, and MongoDB.",
                    "Implemented an auction system that allows sellers to create listings for products they want to auction off, including photos, descriptions, starting bids, and auction end dates.",
                    "One of the challenges I faced during the development of this project was integrating different technologies such as ReactJS, Flask, Python, and MongoDB to create a seamless and user-friendly auction platform. Another challenge was designing the bidding process to ensure a fair and secure auction system that maintains the privacy of all users."
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
