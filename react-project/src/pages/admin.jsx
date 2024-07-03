import React, { useState, useEffect } from "react";
import { fetchVisitCount } from '../utils/formHandler';
import LoginModal from '../components/LoginModal';
import ExperienceForm from '../components/forms/ExperienceForm';
import ProjectForm from '../components/forms/ProjectForm';
import LanguageForm from '../components/forms/LanguageForm';
import EducationForm from '../components/forms/EducationForm';
import Grid from '@mui/material/Unstable_Grid2';
import VisitorChart from '../components/VisitorChart';
import './styles/admin.css';

export default function Admin()
{
    const [files, setFiles] = useState([]);
    const [selectedForm, setSelectedForm] = useState('');
    const [visitCount, setVisitCount] = useState(0);
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        skills: [],
        date: '',
        descriptions: [''],
        projectTitle: '',
        link: '',
        language: '',
        school: '',
        degree: '',
        images: []
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() =>
    {
        const token = localStorage.getItem('token');
        if (!token)
        {
            setIsAuthenticated(false);
        } else
        {
            fetch('/api/verify-token', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response =>
                {
                    if (response.ok)
                    {
                        setIsAuthenticated(true);
                        fetchVisitCount(setVisitCount);
                        const interval = setInterval(() => fetchVisitCount(setVisitCount), 30000);
                        return () => clearInterval(interval);
                    } else
                    {
                        setIsAuthenticated(false);
                    }
                })
                .catch(() => setIsAuthenticated(false));
        }
    }, []);

    useEffect(() =>
    {
        if (selectedForm === 'Experience' || selectedForm === 'Project' || selectedForm === 'Education')
        {
            setFormData((prevState) => ({
                ...prevState,
                descriptions: ['']
            }));
        }
    }, [selectedForm]);

    const renderForm = () =>
    {
        switch (selectedForm)
        {
            case 'Experience':
                return <ExperienceForm formData={formData} setFormData={setFormData} files={files} selectedForm={selectedForm} />;
            case 'Project':
                return <ProjectForm formData={formData} setFormData={setFormData} files={files} selectedForm={selectedForm} />;
            case 'Language':
                return <LanguageForm formData={formData} setFormData={setFormData} selectedForm={selectedForm} />;
            case 'Education':
                return <EducationForm formData={formData} setFormData={setFormData} selectedForm={selectedForm} />;
            default:
                return null;
        }
    };

    const handleLoginSuccess = () =>
    {
        setIsAuthenticated(true);
        fetchVisitCount(setVisitCount);
    };

    return (
        <div className="admin-content">
            {!isAuthenticated && !<LoginModal onLoginSuccess={handleLoginSuccess} />}
            {!isAuthenticated && (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <button className="add-data" type="button" onClick={() => setSelectedForm('Experience')}>Add Experience</button>
                            <button className="add-data" type="button" onClick={() => setSelectedForm('Project')}>Add Project</button>
                            <button className="add-data" type="button" onClick={() => setSelectedForm('Language')}>Add Language</button>
                            <button className="add-data" type="button" onClick={() => setSelectedForm('Education')}>Add Education</button>
                            {renderForm()}
                        </Grid>
                        <Grid item xs={6}>
                            <div className="visit-count">
                                Total Visit Count: {visitCount}
                            </div>
                            <VisitorChart />
                        </Grid>
                    </Grid>

                </>
            )}
        </div>
    );
}