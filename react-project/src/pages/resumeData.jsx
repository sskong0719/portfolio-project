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

export const resumeData = [
    {
        Skills: {
            icon: <AiIcons.AiFillGithub size={40} />,
            link: 'https://github.com/sskong0719'
        },
    },

];
