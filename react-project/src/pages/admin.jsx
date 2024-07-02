import React, { useState, useEffect } from "react";
import Select from "react-select"
import './styles/admin.css';
import './styles/react-select.css';
import { skillsOptions } from './skillsOptions'; // Import the sorted skills options
import { MdClose } from 'react-icons/md';


import LoginModal from '../components/LoginModal';

export default function Admin()
{
    const [files, setFiles] = useState();
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
        } else if (name === 'images')
        {
            setFormData({
                ...formData,
                images: Array.from(files)
            });
        }
        else
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

    const handleFileChange = (e) =>
    {
        const files = Array.from(e.target.files);
        const previews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setFormData(prevFormData => ({
            ...prevFormData,
            images: [...prevFormData.images, ...previews]
        }));
    };

    const removeImage = (index) =>
    {
        setFormData(prevFormData => ({
            ...prevFormData,
            images: prevFormData.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const filteredDescriptions = formData.descriptions.filter(desc => desc.trim() !== '');
    
        const data = new FormData();
        data.append('formType', selectedForm);
        data.append('company', formData.company);
        data.append('title', formData.title);
        data.append('skills', JSON.stringify(formData.skills.map(skill => skill.value)));
        data.append('date', formData.date);
        data.append('descriptions', JSON.stringify(filteredDescriptions));
        data.append('projectTitle', formData.projectTitle);
        data.append('link', formData.link);
        data.append('language', formData.language);
        data.append('school', formData.school);
        data.append('degree', formData.degree);
    
        formData.images.forEach((image, index) => {
            data.append('images', image.file);
        });
    
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('/api/submit-data', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            });
    
            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
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
                                options={skillsOptions}
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
                                        <button type="button" className="remove-button" onClick={() => removeDescriptionField(index)}><MdClose /></button>
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
                                options={skillsOptions}
                                classNamePrefix="react-select"
                                onChange={handleSkillsChange}
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
                                        <button type="button" className="remove-button" onClick={() => removeDescriptionField(index)}><MdClose /></button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="line-div">
                            <label>Link:</label>
                            <input type="text" name="link" value={formData.link} onChange={handleInputChange} />
                        </div>
                        <div className="line-div">
                            <label>Images:</label>
                            <input type="file" name="images" multiple onChange={handleFileChange} />
                            <div className="image-list">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <span>{image.file.name}</span>
                                        <img src={image.preview} alt={`Preview ${index}`} />
                                        <button type="button" className="remove-button" onClick={() => removeImage(index)}><MdClose /></button>
                                    </div>
                                ))}
                            </div>
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
                                        <button type="button" className="remove-button" onClick={() => removeDescriptionField(index)}><MdClose /></button>
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
            {!isAuthenticated && (
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
