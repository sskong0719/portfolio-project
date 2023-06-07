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

/* Programming Languages*/
let python = <img src={pythonLogo} width="40" height="40" alt="Python Logo" />;
let php = <SiIcons.SiPhp size={40} color='#787CB5' />;

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

export const resumeData = [
    {
        Skills: [
            { name: 'Python', logo: python },
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
            { name: 'RESTful API', logo: REST }
        ],
        Projects: [
            {
                title: "Campus Living Rating Web App",
                date: "February 2023 – May 2023",
                description: [
                    "Developed a fully functional web app using ReactJS, PHP, and MySQL.",
                    "Implemented a rating system that allows users to rate various aspects of on and off-campus housing options.",
                    "Designed an intuitive and user-friendly interface that makes it easy for users to submit reviews and browse housing options."
                ]
            },
            {
                title: "Auction House Web App",
                date: "March 2023 – May 2023",
                description: [
                    "In progress for developing an eBay-like auction web app using ReactJS, Flask, Python, and MongoDB.",
                    "Implemented an auction system that allows sellers to create listings for products they want to auction off, including photos, descriptions, starting bids, and auction end dates.",
                    "One of the challenges I faced during the development of this project was integrating different technologies such as ReactJS, Flask, Python, and MongoDB to create a seamless and user-friendly auction platform. Another challenge was designing the bidding process to ensure a fair and secure auction system that maintains the privacy of all users."
                ]
            },
            {
                title: "Brick Breaker Game Project",
                date: "April 2023 – May 2023",
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
