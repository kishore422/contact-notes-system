import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';

const NoteForm = ({ note, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    note_body: note?.body || '',
    tags: note?.tags?.join(', ') || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.note_body) newErrors.note_body = 'Note content is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Process tags if provided
      const processedData = {
        ...formData,
      };
      
      if (formData.tags) {
        processedData.tags = formData.tags.split(',').map(tag => tag.trim());
      }
      
      onSubmit(processedData);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {note ? 'Edit Note' : 'Add New Note'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          required
          fullWidth
          multiline
          rows={4}
          id="note_body"
          name="note_body"
          label="Note Content"
          value={formData.note_body}
          onChange={handleChange}
          error={!!errors.note_body}
          helperText={errors.note_body}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          id="tags"
          name="tags"
          label="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
          helperText="Example: important, follow-up, meeting"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onCancel} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default NoteForm;