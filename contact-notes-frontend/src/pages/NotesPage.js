import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Box, Container, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
import { getNotes, createNote, deleteNote, getContact } from '../services/api';

const NotesPage = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchContactDetails = async () => {
    try {
      const contactData = await getContact(contactId);
      setContact(contactData);
    } catch (err) {
      setError('Failed to fetch contact details');
      console.error(err);
    }
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const notesData = await getNotes(contactId);
      setNotes(notesData);
      setError('');
    } catch (err) {
      setError('Failed to fetch notes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactDetails();
    fetchNotes();
  }, [contactId]);

  const handleAddNote = async (note) => {
    try {
      await createNote(contactId, note);
      fetchNotes();
      setShowForm(false);
    } catch (err) {
      setError('Failed to create note');
      console.error(err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      fetchNotes();
    } catch (err) {
      setError('Failed to delete note');
      console.error(err);
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <IconButton onClick={() => navigate('/contacts')} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Notes
        </Typography>
      </Box>

      {contact && (
        <Typography variant="h6" sx={{ mb: 3 }}>
          for {contact.name}
        </Typography>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Note'}
        </Button>
      </Box>

      {showForm && (
        <NoteForm onSubmit={handleAddNote} onCancel={() => setShowForm(false)} />
      )}

      {loading ? (
        <Typography>Loading notes...</Typography>
      ) : (
        <NoteList notes={notes} onDelete={handleDeleteNote} />
      )}
    </Container>
  );
};

export default NotesPage;