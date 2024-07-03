import React, { useState, useEffect } from "react";
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
    };

    return (
        <div className="admin-content">
            {!isAuthenticated && <LoginModal onLoginSuccess={handleLoginSuccess} />}
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
                            <VisitorChart />
                        </Grid>
                    </Grid>
                </>
            )}
        </div>
    );
}