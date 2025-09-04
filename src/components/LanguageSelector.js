'use client';

import { useState } from 'react';

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState('');

  const handleChange = (e) => {
    const selected = e.target.value;
    setCurrentLanguage(selected);
    console.log('Selected language:', selected); // You can do more logic here
  };

  return (
    <select
      value={currentLanguage}
      onChange={handleChange}
      style={{
        padding: '3px',
        fontWeight: 'bold',
        borderRadius: '8px',
        color: 'black',
        border: '1px solid #ccc',
        outline: 'none',
        backgroundColor: 'white',
        cursor: 'pointer',
      }}
    >
      <option value="">Select Language</option>
      <option value="hi">Hindi</option>
      <option value="pa">Punjabi (Gurmukhi)</option>
      <option value="ur">Urdu</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSelector;
