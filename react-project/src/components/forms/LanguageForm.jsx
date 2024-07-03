import React from 'react';
import { handleInputChange, handleSubmit } from '../../utils/formHandler';

const LanguageForm = ({ formData, setFormData, selectedForm }) => (
  <form className="add-data-form" onSubmit={(e) => handleSubmit(e, formData, setFormData, selectedForm)}>
    <div className="line-div">
      <label>Language:</label>
      <input type="text" name="language" value={formData.language} onChange={(e) => handleInputChange(e, formData, setFormData)} />
    </div>
    <button className="submit-button" type="submit">Submit</button>
  </form>
);

export default LanguageForm;