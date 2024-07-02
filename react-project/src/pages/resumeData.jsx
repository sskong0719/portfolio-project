import houseFinder from '../images/housefinder.jpg';
import sklogo from '../images/logo.svg';
import jbay from '../images/jbay.jpg';
import noImage from '../images/no-image.png';

import { icons } from './icons'; // Assuming icons.js is in the same directory

export const resumeData = [
    {
        Skills: [
            { name: 'Python', logo: icons.python },
            { name: 'C', logo: icons.c },
            { name: 'PHP', logo: icons.php },
            { name: 'CSS3', logo: icons.css3 },
            { name: 'HTML5', logo: icons.html5 },
            { name: 'ReactJS', logo: icons.reactjs },
            { name: 'MySQL', logo: icons.mysql },
            { name: 'MongoDB', logo: icons.mongodb },
            { name: 'Flask', logo: icons.flask },
            { name: 'Figma', logo: icons.figma },
            { name: 'GitHub', logo: icons.github },
            { name: 'Docker', logo: icons.docker },
            { name: 'RESTful API', logo: icons.REST },
            { name: 'NGINX', logo: icons.nginx },
            { name: 'Ubuntu', logo: icons.ubuntu },
            { name: 'ARM Assembly', logo: icons.arm }
        ],
        Experience: [
            {
                id: 1,
                company: "Tatum Games, LLC",
                title: "Web Developer Intern",
                skills: [icons.php, icons.html5, icons.css3],
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
                description: [
                    "UB Hackathon Fall 2023",
                    "Played a role as team captain and fullstack dev. Completed the project within 24 hours. Very fun experience.",
                    "Key Coursework: Machine Learning, Data Structures, Web Development, Algorithms, AI Fundamentals"
                ]
            }
        ],
        Projects: [
            {
                id: 1,
                img: sklogo,
                title: "SK Portfolio Website",
                skills: [icons.flask, icons.python, icons.reactjs, icons.css3, icons.github, icons.docker, icons.nginx, icons.mongodb, icons.ubuntu],
                summary: "This portfolio website was created to showcase my skills. It is frontend heavy and only has one backend feature (\"SMTP\") for sending emails in the Contact page, I will be adding more project to demonstrate what I have learnt so far.",
                date: "May 2023 - July 2023",
                link: 'https://samuelkong.dev/',
                description: [
                    "Developed a personal portfolio site using ReactJS and Python, showcasing full-stack projects with a dynamic and responsive UI.",
                    "Focused on intuitive navigation and a modern aesthetic to highlight frontend and backend development skills.",
                    "Utilizing Docker, Nginx, and Certbot for containerization, web server management, and SSL certification.",
                    "I will be adding more fun projects to showcase my skills!"
                ]
            },
            {
                id: 2,
                img: houseFinder,
                title: "Campus Living Rating Web App",
                skills: [icons.php, icons.mysql, icons.reactjs, icons.css3, icons.github, icons.figma],
                summary: "During my senior year at the University at Buffalo, I developed this project for my CSE 442 Software Engineering course. The primary objective of this project was to assess and compare all available on-campus housing choices, ultimately delivering the most suitable housing option for users.",
                date: "February 2023 – May 2023",
                link: 'https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442h/',
                description: [
                    "Built a housing interactive web app using ReactJS and PHP, allowing user interactions like account creation and ratings.",
                    "Used MySQL for data storage, with features for favorites and profile picture uploads to enhance user engagement.",
                    "Collaborated with teammates using Zenhub for project management and GitHub for version control, ensuring efficient workflow and communication."
                ]
            },
            {
                id: 3,
                img: jbay,
                title: "Auction House Web App",
                skills: [icons.python, icons.mongodb, icons.reactjs, icons.css3, icons.github, icons.figma, icons.docker, icons.flask],
                summary: "This project was created during my senior year at University at Buffalo for CSE to Web Applications. The primary objective of this project was to demonstrate my understanding and application of various concepts covered in the course. These concepts included websockets, security measures, cookie handling, data management, parsing HTTP headers, and establishing TCP connections.",
                date: "March 2023 – May 2023",
                link: 'https://www.youtube.com/watch?v=3B_hgpQ0coE&ab_channel=JourneySpratt/',
                description: [
                    "Developed an eBay - style app with ReactJS and Python / Flask, featuring real - time auction capabilities and detailed product listings.",
                    "Created dynamic profiles with MongoDB, and integrated WebSockets for live updates to boost user interaction.",
                    "Implemented password hashing and HTML injection prevention for robust data protection."
                ]
            },
            {
                id: 4,
                img: noImage,
                title: "Brick Breaker Game Project",
                skills: [icons.arm],
                summary: "",
                date: "April 2023 – May 2023",
                link: '',
                description: [
                    "Designed and developed a Brick Breaker game using ARM Assembly language and low - level hardware programming techniques such as GPIO, Timer, and UART.",
                    "Implemented GPIO to control input / output operations, Timer for game mechanics and frame rate control, and UART to display score and other game information on a serial terminal.",
                    "Challenges encountered during the development process were mostly optimizing performance and calculation challenges for the ball and paddle to move accurately and smoothly."
                ]
            }
        ],
        Language: ["Chinese", "Cantonese", "English"]
    }
];