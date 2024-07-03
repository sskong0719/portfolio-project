import React from 'react';
import { MdClose } from 'react-icons/md';
import { handleInputChange, addDescriptionField, removeDescriptionField, handleSubmit } from '../../utils/formHandler';

const EducationForm = ({ formData, setFormData, selectedForm, files }) => (
    <form className="add-data-form" onSubmit={(e) => handleSubmit(e, formData, setFormData, selectedForm)}>
        <div className="line-div">
            <label>School Name:</label>
            <input type="text" name="school" value={formData.school} onChange={(e) => handleInputChange(e, formData, setFormData, files)} />
        </div>
        <div className="line-div">
            <label>Degree:</label>
            <input type="text" name="degree" value={formData.degree} onChange={(e) => handleInputChange(e, formData, setFormData, files)} />
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

export default EducationForm;