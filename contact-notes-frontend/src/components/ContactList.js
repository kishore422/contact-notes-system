import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, IconButton, Paper, Divider, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteIcon from '@mui/icons-material/Note';

const ContactList = ({ contacts, onDelete }) => {
  const navigate = useNavigate();

  if (!contacts.length) {
    return (
      <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 4 }}>
        No contacts found. Add one to get started!
      </Typography>
    );
  }

  return (
    <Paper 
      elevation={2}
      sx={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2
      }}
    >
      <List>
        {contacts.map((contact, index) => (
          <React.Fragment key={contact._id}>
            <ListItem
              sx={{
                transition: 'all 0.3s ease',
                background: 'transparent',
                '&:hover': {
                  background: 'rgba(63, 81, 181, 0.1)',
                  transform: 'scale(1.02)'
                }
              }}
              secondaryAction={
                <Box>
                  <IconButton 
                    edge="end" 
                    aria-label="notes" 
                    onClick={() => navigate(`/contacts/${contact._id}/notes`)}
                    sx={{ mr: 1 }}
                  >
                    <NoteIcon />
                  </IconButton>
                  <IconButton 
                    edge="end" 
                    aria-label="delete" 
                    onClick={() => onDelete(contact._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={contact.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {contact.email}
                    </Typography>
                    {contact.phone && ` · ${contact.phone}`}
                    {contact.company && ` · ${contact.company}`}
                  </>
                }
              />
            </ListItem>
            {index < contacts.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default ContactList;