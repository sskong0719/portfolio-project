import houseFinder from '../images/housefinder.png';
import sklogo from '../images/logo.svg';
import jbay from '../images/jbay.png';
import noImage from '../images/no-image.png';
import * as SiIcons from 'react-icons/si';
import * as GrIcons from 'react-icons/gr';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import pythonLogo from '../images/python-logo-only.svg'
import css3Logo from '../images/css3.svg'
import figmaLogo from '../images/figma.svg'
import mysqlLogo from '../images/mysql.svg'

let python = <img src={pythonLogo} width="40" height="40" alt="Python Logo" />;
let figma = <img src={figmaLogo} width="40" height="40" alt="Python Logo" />;
let github = <AiIcons.AiFillGithub size={40} />;
let css3 = <img src={css3Logo} width="40" height="40" alt="Python Logo" />;
let php = <SiIcons.SiPhp size={40} color='#787CB5' />;
let mysql = <img src={mysqlLogo} width="40" height="40" alt="Python Logo" />;
let reactjs = <GrIcons.GrReactjs size={40} color='#61dbfb' />;
let mongodb = <SiIcons.SiMongodb size={40} color='#27C937' />;
let docker = <FaIcons.FaDocker size={40} color='#2FAFF4' />;
let flask = <SiIcons.SiFlask size={40} />;
let nginx = <SiIcons.SiNginx size={40} color='#009900' />;
let ubuntu = <FaIcons.FaUbuntu size={40} color='#E95420' />

export const listings = [
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
    link: 'https://jessebay.us/',
    description: [
      "In progress for developing an eBay-like auction web app using ReactJS, Flask, Python, and MongoDB.",
      "Implemented an auction system that allows sellers to create listings for products they want to auction off, including photos, descriptions, starting bids, and auction end dates.",
      "One of the challenges I faced during the development of this project was integrating different technologies such as ReactJS, Flask, Python, and MongoDB to create a seamless and user-friendly auction platform. Another challenge was designing the bidding process to ensure a fair and secure auction system that maintains the privacy of all users."
    ]
  }, {
    id: 4,
    img: noImage,
    title: "Brick Breaker Game Project",
    skills: [],
    date: "April 2023 – May 2023",
    link: '',
    description: [
      "Designed and developed a Brick Breaker game using ARM Assembly language and low-level hardware programming techniques such as GPIO, Timer, and UART.",
      "Implemented GPIO to control input/output operations, Timer for game mechanics and frame rate control, and UART to display score and other game information on a serial terminal.",
      "Challenges encountered during the development process were mostly optimizing performance and calculation challenges for the ball and paddle to move accurately and smoothly."
    ]
  }
];

