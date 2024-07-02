import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select"
import './styles/admin.css';
import './styles/react-select.css';

import LoginModal from '../components/LoginModal';

export default function Admin()
{
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
        degree: ''
    });

    const options = useMemo(() => [
        { value: 'python', label: 'Python' },
        { value: 'c', label: 'C' },
        { value: 'php', label: 'PHP' },
        { value: 'css3', label: 'CSS' },
        { value: 'html5', label: 'HTML' },
        { value: 'reactjs', label: 'ReactJS' },
        { value: 'mysql', label: 'MySQL' },
        { value: 'mongodb', label: 'MongoDB' },
        { value: 'flask', label: 'Flask' },
        { value: 'figma', label: 'Figma' },
        { value: 'github', label: 'GitHub' },
        { value: 'docker', label: 'Docker' },
        { value: 'restful_api', label: 'RESTful API' },
        { value: 'nginx', label: 'NGINX' },
        { value: 'ubuntu', label: 'Ubuntu' },
        { value: 'arm_assembly', label: 'ARM Assembly' },
        { value: 'node_js', label: 'Node.js' },
    ], []);

    // Sorting the options list by label in alphabetical order for accessibility
    const sortedOptions = useMemo(() => options.sort(({ label: labelA = "" }, { label: labelB = "" }) => labelA.localeCompare(labelB)), [options]);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() =>
    {
        // Check for token on page load
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
                        fetchVisitCount();
                        const interval = setInterval(fetchVisitCount, 30000);
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
        // Reset descriptions when selectedForm changes
        if (selectedForm === 'Experience' || selectedForm === 'Project' || selectedForm === 'Education')
        {
            setFormData((prevState) => ({
                ...prevState,
                descriptions: ['']
            }));
        }
    }, [selectedForm]);

    const handleSkillsChange = (selectedOptions) =>
    {
        console.log(selectedOptions);
        setFormData({
            ...formData,
            skills: selectedOptions || [],
        });
    };

    const handleInputChange = (e, index) =>
    {
        const { name, value } = e.target;

        if (name === 'descriptions')
        {
            const newDescriptions = [...formData.descriptions];
            newDescriptions[index] = value;
            setFormData({
                ...formData,
                descriptions: newDescriptions
            });
        } else
        {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const addDescriptionField = () =>
    {
        if (formData.descriptions.length < 5)
        {
            setFormData({
                ...formData,
                descriptions: [...formData.descriptions, '']
            });
        }
    };

    const removeDescriptionField = (index) =>
    {
        if (formData.descriptions.length > 1)
        {
            const newDescriptions = formData.descriptions.filter((desc, i) => i !== index);
            setFormData({
                ...formData,
                descriptions: newDescriptions
            });
        }
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        const filteredDescriptions = formData.descriptions.filter(desc => desc.trim() !== '');

        const data = {
            ...formData,
            descriptions: filteredDescriptions,
            formType: selectedForm // Add the form type to the data object
        };

        const token = localStorage.getItem('token');

        fetch('/api/submit-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result =>
            {
                console.log('Success:', result);
            })
            .catch(error =>
            {
                console.error('Error:', error);
            });
    };

    const fetchVisitCount = () =>
    {
        fetch('/api/visit-count')
            .then(response => response.json())
            .then(data => setVisitCount(data.visit_count))
            .catch(error => console.error('Error fetching visit count:', error));
    };

    const renderForm = () =>
    {
        switch (selectedForm)
        {
            case 'Experience':
                return (
                    <form className="add-data-form" onSubmit={handleSubmit}>
                        <div className="line-div">
                            <label>Company:</label>
                            <input type="text" name="company" value={formData.company} onChange={handleInputChange} />
                        </div>
                        <div className="line-div">
                            <label>Job Title:</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                        </div>
                        <div className="line-div">
                            <label>Skills:</label>
                            <Select
                                defaultValue={[]}
                                isMulti
                                name="skills"
                                options={sortedOptions}
                                classNamePrefix="react-select" onChange={handleSkillsChange}
                            />
                        </div>
                        <div className="line-div">
                            <label>Date:</label>
                            <input type="text" name="date" value={formData.date} onChange={handleInputChange} />
                        </div>
                        <div className="line-div">
                            <div className="description-container">
                                <label>Description:</label>
                                {formData.descriptions.length < 5 && (
                                    <button type="button" className="add-description-button" onClick={addDescriptionField}>+</button>
                                )}
                            </div>
                            {formData.descriptions.map((desc, index) => (
                                <div key={index} className="description-field">
                                    <input
                                        type="text"
                                        name="descriptions"
                                        value={desc}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                    {formData.descriptions.length > 1 && (
                                        <button type="button" className="remove-button" onClick={() => removeDescriptionField(index)}>-</button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button className="submit-button" type="submit">Submit</button>
                    </form>
                );
            case 'Project':
                return (
                    <form className="add-data-form" onSubmit={handleSubmit}>
                        <div className="line-div">
                            <label>Project Title:</label>
                            <input type="text" name="projectTitle" value={formData.projectTitle} onChange={handleInputChange} />
                        </div>
                        <div className="line-div">
                            <label>Skills:</label>
                            <Select
                                defaultValue={[]}
                                isMulti
                                name="skills"
                                options={sortedOptions}
                                classNamePrefix="react-select" onChange={handleSkillsChange}
                            />
                        </div>
                        <div className="line-div">
                            <label>Date:</label>
                            <input type="text" name="date" value={formData.date} onChange={handleInputChange} />
                        </div>
                        <div className="line-div">
                            <div className="description-container">
                                <label>Description:</label>
                                {formData.descriptions.length < 5 && (
                                    <button type="button" className="add-description-button" onClick={addDescriptionField}>+</button>
                                )}
                            </div>

                            {formData.descriptions.map((desc, index) => (
                                <div key={index} className="description-field">
                                    <input
                                        type="text"
                                        name="descriptions"
                                        value={desc}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                    {formData.descriptions.length > 1 && (
                                        <button type="button" className="remove-button" onClick={() => removeDescriptionField(index)}>-</button>
                                    )}
                                </div>
                            ))}

                        </div>
                        <div className="line-div">
                            <label>Link:</label>
                            <input type="text" name="link" value={formData.link} onChange={handleInputChange} />
                        </div>
                        <button className="submit-button" type="submit">Submit</button>
                    </form>
                );
            case 'Language':
                return (
                    <form className="add-data-form" onSubmit={handleSubmit}>
                        <div className="line-div">
                            <label>Language:</label>
                            <input type="text" name="language" value={formData.language} onChange={handleInputChange} />
                        </div>
                        <button className="submit-button" type="submit">Submit</button>
                    </form>
                );
            case 'Education':
                return (
                    <form className="add-data-form" onSubmit={handleSubmit}>
                        <div className="line-div">
                            <label>School Name:</label>
                            <input type="text" name="school" value={formData.school} onChange={handleInputChange} />
                        </div>
                        <div className="line-div">
                            <label>Degree:</label>
                            <input type="text" name="degree" value={formData.degree} onChange={handleInputChange} />
                        </div>
                        <div className="line-div">
                            <label>Date:</label>
                            <input type="text" name="date" value={formData.date} onChange={handleInputChange} />
                        </div>
                        <div className="line-div">
                            <div className="description-container">
                                <label>Description:</label>
                                {formData.descriptions.length < 5 && (
                                    <button type="button" className="add-description-button" onClick={addDescriptionField}>+</button>
                                )}
                            </div>
                            {formData.descriptions.map((desc, index) => (
                                <div key={index} className="description-field">
                                    <input
                                        type="text"
                                        name="descriptions"
                                        value={desc}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                    {formData.descriptions.length > 1 && (
                                        <button type="button" className="remove-button" onClick={() => removeDescriptionField(index)}>-</button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button className="submit-button" type="submit">Submit</button>
                    </form>
                );
            default:
                return null;
        }
    };

    const handleLoginSuccess = () =>
    {
        setIsAuthenticated(true);
        fetchVisitCount();
    };

    return (
        <div className="admin-content">

            {!isAuthenticated && <LoginModal onLoginSuccess={handleLoginSuccess} />}
            {isAuthenticated && (
                <>
                    <div className="visit-count">Total Visit Count: {visitCount}</div>
                    <button className="add-data" type="button" onClick={() => setSelectedForm('Experience')}>Add Experience</button>
                    <button className="add-data" type="button" onClick={() => setSelectedForm('Project')}>Add Project</button>
                    <button className="add-data" type="button" onClick={() => setSelectedForm('Language')}>Add Language</button>
                    <button className="add-data" type="button" onClick={() => setSelectedForm('Education')}>Add Education</button>
                    {renderForm()}
                </>
            )}
        </div>
    );
}
