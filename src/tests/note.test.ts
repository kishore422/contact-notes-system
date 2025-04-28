import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import Contact from '../models/Contact';
import Note from '../models/Note';
import noteQueue from '../queues/noteQueue';

describe('Note API Tests', () => {
  let token: string;
  let contactId: string;
  let noteId: string;

  beforeAll(async () => {

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'password123'
      });
    
    token = loginResponse.body.token;

    const contact = await Contact.create({
      name: 'Test Contact',
      email: 'test@example.com'
    });
    
    contactId = (contact as any)._id.toString();
  });

  afterAll(async () => {
    await Note.deleteMany({});
    await Contact.deleteMany({});
    await mongoose.connection.close();
    await noteQueue.close();
  });

  describe('POST /api/contacts/:id/notes', () => {
    it('should create a note with field normalization', async () => {
      const response = await request(app)
        .post(`/api/contacts/${contactId}/notes`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          note_body: 'This is a test note',
          tags: ['test', 'important']
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('body', 'This is a test note');
      expect(response.body).toHaveProperty('tags');
      expect(response.body.tags).toContain('test');
      
      noteId = response.body._id;
    });

    it('should reject note creation without token', async () => {
      const response = await request(app)
        .post(`/api/contacts/${contactId}/notes`)
        .send({
          body: 'This is a test note'
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/contacts/:id/notes', () => {
    it('should get all notes for a contact', async () => {
      const response = await request(app)
        .get(`/api/contacts/${contactId}/notes`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});