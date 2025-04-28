// src/controllers/noteController.ts
import { Request, Response } from 'express';
import Note from '../models/Note';
import Contact from '../models/Contact';
import { normalizeNoteFields } from '../utils/fieldNormalizer';
import { addNoteToQueue } from '../queues/noteQueue';

// Create a new note for a contact
export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const contactId = req.params.id;
    
    // Check if contact exists
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }
    
    // Normalize fields (e.g., note_body → body)
    const normalizedData = normalizeNoteFields(req.body);
    
    // Create the note
    const note = new Note({
      ...normalizedData,
      contact: contactId
    });
    
    const savedNote = await note.save();
    
    // Add note to queue for background processing
    await addNoteToQueue(savedNote);
    
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: 'Error creating note', error });
  }
};

// Get all notes for a contact
export const getNotesByContactId = async (req: Request, res: Response): Promise<void> => {
  try {
    const contactId = req.params.id;
    
    // Check if contact exists
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }
    
    const notes = await Note.find({ contact: contactId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error });
  }
};

// Get a single note by ID
export const getNoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const note = await Note.findById(req.params.note_id).populate('contact');
    
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching note', error });
  }
};

// Update a note
export const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    // Normalize fields
    const normalizedData = normalizeNoteFields(req.body);
    
    const note = await Note.findByIdAndUpdate(
      req.params.note_id,
      normalizedData,
      { new: true, runValidators: true }
    );
    
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: 'Error updating note', error });
  }
};

// Delete a note
export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const note = await Note.findByIdAndDelete(req.params.note_id);
    
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error });
  }
};