import * as SiIcons from 'react-icons/si';
import * as GrIcons from 'react-icons/gr';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import pythonLogo from '../images/python-logo-only.svg';
import css3Logo from '../images/css3.svg';
import figmaLogo from '../images/figma.svg';
import mysqlLogo from '../images/mysql.svg';
import html5Logo from '../images/html5.svg';
import RESTLogo from '../images/rest-api-icon.svg';
import armLogo from '../images/ArmLogo.svg';
import cLogo from '../images/c.svg';

export const icons = {
    python: <img src={pythonLogo} className="tech-icon" width="40" height="40" alt="Python Logo" />,
    php: <SiIcons.SiPhp className="tech-icon" size={40} color='#787CB5' />,
    arm: <img src={armLogo} className="tech-icon" width="40" height="40" alt="ARM Assembly Logo" />,
    c: <img src={cLogo} className="tech-icon" width="40" height="40" alt="C Logo" />,
    mysql: <img src={mysqlLogo} className="tech-icon" width="40" height="40" alt="MySQL Logo" />,
    mongodb: <SiIcons.SiMongodb className="tech-icon" size={40} color='#27C937' />,
    html5: <img src={html5Logo} className="tech-icon" width="40" height="40" alt="HTML5 Logo" />,
    css3: <img src={css3Logo} className="tech-icon" width="40" height="40" alt="CSS3 Logo" />,
    reactjs: <GrIcons.GrReactjs className="tech-icon" size={40} color='#61dbfb' />,
    flask: <SiIcons.SiFlask className="tech-icon" size={40} />,
    REST: <img src={RESTLogo} className="tech-icon" width="40" height="40" alt="RESTful API Logo" />,
    figma: <img src={figmaLogo} className="tech-icon" width="40" height="40" alt="Figma Logo" />,
    github: <AiIcons.AiFillGithub className="tech-icon" size={40} />,
    docker: <FaIcons.FaDocker className="tech-icon" size={40} color='#2FAFF4' />,
    nginx: <SiIcons.SiNginx className="tech-icon" size={40} color='#009900' />,
    ubuntu: <FaIcons.FaUbuntu className="tech-icon" size={40} color='#E95420' />
};