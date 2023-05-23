import houseFinder from '../images/housefinder.png';
import jbay from '../images/jbay.png';
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
export const listings = [
  {
    img: houseFinder,
    name: "House Finder",
    skills: [php, mysql, reactjs, css3, github, figma],
    description: "During my senior year at the University at Buffalo, I developed this project for my CSE 442 Software Engineering course. The primary objective of this project was to assess and compare all available on-campus housing choices, ultimately delivering the most suitable housing option for users.",
    date: "2023 Spring",
    link: 'https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442h/',
  }, {
    img: jbay,
    name: "Auction House",
    skills: [python, mongodb, reactjs, css3, github, figma, docker, flask],
    description: "This project was created during my senior year at University at Buffalo for CSE 312 Introduction to Web Applications. The primary objective of this project was to demonstrate my understanding and application of various concepts covered in the course. These concepts included websockets, security measures, cookie handling, data management, parsing HTTP headers, and establishing TCP connections.",
    date: "2023 Spring",
    link: 'https://jessebay.us/',
  }
];
