import React from 'react';
import { List, ListItem, ListItemText, IconButton, Paper, Divider, Typography, Chip, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

const NoteList = ({ notes, onDelete }) => {
  if (!notes.length) {
    return (
      <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 4 }}>
        No notes found. Add one to get started!
      </Typography>
    );
  }

  return (
    <Paper elevation={2}>
      <List>
        {notes.map((note, index) => (
          <React.Fragment key={note._id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(note._id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={note.body}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textSecondary">
                      {note.createdAt && formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                    </Typography>
                    {note.tags && note.tags.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        {note.tags.map((tag) => (
                          <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5 }} />
                        ))}
                      </Box>
                    )}
                  </>
                }
              />
            </ListItem>
            {index < notes.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default NoteList;