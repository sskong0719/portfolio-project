import React from 'react';
import Select from 'react-select';
import { MdClose } from 'react-icons/md';
import { skillsOptions } from '../../utils/skillsOptions';
import { handleInputChange, addDescriptionField, removeDescriptionField, handleSkillsChange, handleSubmit } from '../../utils/formHandler';

const ExperienceForm = ({ formData, setFormData, files, selectedForm }) => (
    <form className="add-data-form" onSubmit={(e) => handleSubmit(e, formData, setFormData, selectedForm)}>
        <div className="line-div">
            <label>Company:</label>
            <input type="text" name="company" value={formData.company} onChange={(e) => handleInputChange(e, formData, setFormData, files)} />
        </div>
        <div className="line-div">
            <label>Job Title:</label>
            <input type="text" name="title" value={formData.title} onChange={(e) => handleInputChange(e, formData, setFormData, files)} />
        </div>
        <div className="line-div">
            <label>Skills:</label>
            <Select
                defaultValue={[]}
                isMulti
                name="skills"
                options={skillsOptions}
                classNamePrefix="react-select"
                onChange={(selectedOptions) => handleSkillsChange(selectedOptions, formData, setFormData)}
            />
        </div>
        <div className="line-div">
            <label>Date:</label>
            <input type="text" name="date" value={formData.date} onChange={(e) => handleInputChange(e, formData, setFormData, files)} />
        </div>
        <div className="line-div">
            <div className="description-container">
                <label>Description:</label>
                {formData.descriptions.length < 5 && (
                    <button type="button" className="add-description-button" onClick={() => addDescriptionField(formData, setFormData)}>+</button>
                )}
            </div>
            {formData.descriptions.map((desc, index) => (
                <div key={index} className="description-field">
                    <input
                        type="text"
                        name="descriptions"
                        value={desc}
                        onChange={(e) => handleInputChange(e, formData, setFormData, files, index)}
                    />
                    {formData.descriptions.length > 1 && (
                        <button type="button" className="remove-button" onClick={() => removeDescriptionField(index, formData, setFormData)}><MdClose /></button>
                    )}
                </div>
            ))}
        </div>
        <button className="submit-button" type="submit">Submit</button>
    </form>
);

export default ExperienceForm;