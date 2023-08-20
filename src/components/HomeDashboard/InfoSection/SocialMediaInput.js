// SocialMediaInput.js
import React, { useState } from 'react';
import { TextField } from '@mui/material';

const SocialMediaInput = ({ name, value, onChange }) => {
  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  return (
    <TextField
      id={`outlined-${name}-link`}
      value={value || ''}
      onChange={handleChange}
      size="small"
      placeholder={`Paste ${name.toLowerCase()} link here`}
      autoFocus
    />
  );
};

export default SocialMediaInput;
