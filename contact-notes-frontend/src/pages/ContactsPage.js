import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Container } from '@mui/material';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import { getContacts, createContact, deleteContact } from '../services/api';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getContacts();
      setContacts(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = async (contact) => {
    try {
      await createContact(contact);
      fetchContacts();
      setShowForm(false);
    } catch (err) {
      setError('Failed to create contact');
      console.error(err);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      fetchContacts();
    } catch (err) {
      setError('Failed to delete contact');
      console.error(err);
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
      <Typography variant="h4" component="h1" sx={{ color: '#0d47a1' }}>
  Contacts
</Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Contact'}
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {showForm && (
        <ContactForm onSubmit={handleAddContact} onCancel={() => setShowForm(false)} />
      )}

      {loading ? (
        <Typography>Loading contacts...</Typography>
      ) : (
        <ContactList contacts={contacts} onDelete={handleDeleteContact} />
      )}
    </Container>
  );
};

export default ContactsPage;