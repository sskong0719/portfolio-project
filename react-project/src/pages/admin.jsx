import React, { useState } from "react";
import './styles/admin.css';

export default function Admin() {
    const [selectedForm, setSelectedForm] = useState('');
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        skills: '',
        date: '',
        descriptions: [''],
        projectTitle: '',
        link: '',
        language: '',
        school: '',
        degree: ''
    });

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;

        if (name === 'descriptions') {
            const newDescriptions = [...formData.descriptions];
            newDescriptions[index] = value;
            setFormData({
                ...formData,
                descriptions: newDescriptions
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const addDescriptionField = () => {
        if (formData.descriptions.length < 5) {
            setFormData({
                ...formData,
                descriptions: [...formData.descriptions, '']
            });
        }
    };

    const removeDescriptionField = (index) => {
        if (formData.descriptions.length > 1) {
            const newDescriptions = formData.descriptions.filter((desc, i) => i !== index);
            setFormData({
                ...formData,
                descriptions: newDescriptions
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredDescriptions = formData.descriptions.filter(desc => desc.trim() !== '');

        const data = {
            ...formData,
            descriptions: filteredDescriptions
        };

        console.log(data);

        // Here you can handle the form submission, e.g., send data to the server
    };

    const renderForm = () => {
        switch (selectedForm) {
            case 'Experience':
                return (
                    <form className="add-data-form" onSubmit={handleSubmit}>
                        <div>
                            <label>Company:</label>
                            <input type="text" name="company" value={formData.company} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Job Title:</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Skills:</label>
                            <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Date:</label>
                            <input type="text" name="date" value={formData.date} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Description:</label>
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
                            {formData.descriptions.length < 5 && (
                                <button type="button" className="add-description-button" onClick={addDescriptionField}>Add Description +</button>
                            )}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                );
            case 'Project':
                return (
                    <form className="add-data-form" onSubmit={handleSubmit}>
                        <div>
                            <label>Project Title:</label>
                            <input type="text" name="projectTitle" value={formData.projectTitle} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Skills:</label>
                            <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Date:</label>
                            <input type="text" name="date" value={formData.date} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Description:</label>
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
                            {formData.descriptions.length < 5 && (
                                <button type="button" className="add-description-button" onClick={addDescriptionField}>Add Description +</button>
                            )}
                        </div>
                        <div>
                            <label>Link:</label>
                            <input type="text" name="link" value={formData.link} onChange={handleInputChange} />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                );
            case 'Language':
                return (
                    <form className="add-data-form" onSubmit={handleSubmit}>
                        <div>
                            <label>Language:</label>
                            <input type="text" name="language" value={formData.language} onChange={handleInputChange} />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                );
            case 'Education':
                return (
                    <form className="add-data-form" onSubmit={handleSubmit}>
                        <div>
                            <label>School Name:</label>
                            <input type="text" name="school" value={formData.school} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Degree:</label>
                            <input type="text" name="degree" value={formData.degree} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Date:</label>
                            <input type="text" name="date" value={formData.date} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Description:</label>
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
                            {formData.descriptions.length < 5 && (
                                <button type="button" className="add-description-button" onClick={addDescriptionField}>Add Description +</button>
                            )}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-content">
                <button className="add-data" type="button" onClick={() => setSelectedForm('Experience')}>Add Experience</button>
                <button className="add-data" type="button" onClick={() => setSelectedForm('Project')}>Add Project</button>
                <button className="add-data" type="button" onClick={() => setSelectedForm('Language')}>Add Language</button>
                <button className="add-data" type="button" onClick={() => setSelectedForm('Education')}>Add Education</button>
            {renderForm()}
        </div>
    );
}
