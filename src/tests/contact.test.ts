import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import Contact from '../models/Contact';
import noteQueue from '../queues/noteQueue';

describe('Contact API Tests', () => {
  let token: string;
  let contactId: string;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'password123'
      });
    
    token = loginResponse.body.token;
  });

  afterAll(async () => {
    // Cleanup
    await Contact.deleteMany({});
    await mongoose.connection.close();
    await noteQueue.close();
  });

  describe('POST /api/contacts', () => {
    it('should create a new contact', async () => {
      const response = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          company: 'Test Company'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('name', 'John Doe');
      expect(response.body).toHaveProperty('email', 'john@example.com');
      
      contactId = response.body._id;
    });

    it('should reject contact creation without token', async () => {
      const response = await request(app)
        .post('/api/contacts')
        .send({
          name: 'John Doe',
          email: 'john@example.com'
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/contacts', () => {
    it('should get all contacts', async () => {
      const response = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});