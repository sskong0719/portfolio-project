import React from 'react';
import Select from 'react-select';
import { MdClose } from 'react-icons/md';
import { skillsOptions } from '../../utils/skillsOptions';
import { handleInputChange, addDescriptionField, removeDescriptionField, handleSkillsChange, handleSubmit, handleFileChange, removeImage } from '../../utils/formHandler';

const ProjectForm = ({ formData, setFormData, files, selectedForm }) => (
  <form className="add-data-form" onSubmit={(e) => handleSubmit(e, formData, setFormData, selectedForm)}>
    <div className="line-div">
      <label>Project Title:</label>
      <input type="text" name="projectTitle" value={formData.projectTitle} onChange={(e) => handleInputChange(e, formData, setFormData, files)} />
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
    <div className="line-div">
      <label>Link:</label>
      <input type="text" name="link" value={formData.link} onChange={(e) => handleInputChange(e, formData, setFormData, files)} />
    </div>
    <div className="line-div">
      <label>Images:</label>
      <input type="file" name="images" multiple onChange={(e) => handleFileChange(e, formData, setFormData)} />
      <div className="image-list">
        {formData.images.map((image, index) => (
          <div key={index} className="image-item">
            <span>{image.file.name}</span>
            <img src={image.preview} alt={`Preview ${index}`} />
            <button type="button" className="remove-button" onClick={() => removeImage(index, formData, setFormData)}><MdClose /></button>
          </div>
        ))}
      </div>
    </div>
    <button className="submit-button" type="submit">Submit</button>
  </form>
);

export default ProjectForm;