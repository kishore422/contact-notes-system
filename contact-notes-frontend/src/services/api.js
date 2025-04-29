import axios from 'axios';
import { getToken } from './auth';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getContacts = async () => {
  try {
    const response = await api.get('/contacts');
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const getContact = async (id) => {
  try {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching contact ${id}:`, error);
    throw error;
  }
};

export const createContact = async (contact) => {
  try {
    const response = await api.post('/contacts', contact);
    return response.data;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

export const updateContact = async (id, contact) => {
  try {
    const response = await api.put(`/contacts/${id}`, contact);
    return response.data;
  } catch (error) {
    console.error(`Error updating contact ${id}:`, error);
    throw error;
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting contact ${id}:`, error);
    throw error;
  }
};

export const getNotes = async (contactId) => {
  try {
    const response = await api.get(`/contacts/${contactId}/notes`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notes for contact ${contactId}:`, error);
    throw error;
  }
};

export const createNote = async (contactId, note) => {
  try {
    const response = await api.post(`/contacts/${contactId}/notes`, note);
    return response.data;
  } catch (error) {
    console.error(`Error creating note for contact ${contactId}:`, error);
    throw error;
  }
};

export const updateNote = async (noteId, note) => {
  try {
    const response = await api.put(`/notes/${noteId}`, note);
    return response.data;
  } catch (error) {
    console.error(`Error updating note ${noteId}:`, error);
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting note ${noteId}:`, error);
    throw error;
  }
};