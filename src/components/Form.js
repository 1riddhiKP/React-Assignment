import React, { useState } from 'react';

function Form({ onUpload }) {
  const [formData, setFormData] = useState({
    photo: null,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.photo && formData.description) {
      const newPhoto = {
        id: Date.now(),
        ...formData
      };
      onUpload(newPhoto);
      setFormData({ photo: null, description: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      Upload Photo: <input type="file" name="photo" onChange={handleChange} /> 
      <br/>
      <br/>

      Description:    <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <br/>
      
      <button type="submit">Add Photo</button>
      <br/><br/><br/>
    </form>
  );
};

export default Form;
