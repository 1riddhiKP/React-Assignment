// src/App.js
import React, { useState } from 'react';
import Form from './components/Form';
import List from './components/List';


const App = () => {
  const [photos, setPhotos] = useState([]);

  const handleUpload = (newPhoto) => {
    setPhotos([...photos, newPhoto]);
  };

  return (
    <div className='App'>
      <h1>React Assignment</h1>
      <Form onUpload={handleUpload} />
      <List setPhotos={setPhotos} photos={photos}/>  
    </div>
  );
};

export default App;
