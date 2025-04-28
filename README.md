# Contact Notes System
A backend-focused application for managing contacts and their notes, built with Node.js, Express, TypeScript, MongoDB, Redis, and React.
---

## Features
- JWT-based authentication
- CRUD operations for contacts and notes
- Field normalization for incoming note data
- Background job processing with Bull Queue and Redis
- Modern React frontend with Material UI (Optional)
- Comprehensive API documentation via Swagger
- Unit and Integration Testing using Jest and Supertest
---

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Swagger for API documentation
- Bull for queue processing

### Frontend (Optional)
- React
- Material UI
- React Router
- Axios
---

## Prerequisites
- Node.js (v14 or above)
- MongoDB
- Redis (for Bull queue processing, optional if testing only backend)
---

## Installation & Setup

### Backend Setup
1. Navigate to the backend project directory:
cd contact-notes-system

2. Install backend dependencies:
npm install


3. Create a ".env" file in the root directory with the following variables:
*(Already created, no need to modify unless you want to use your own MongoDB URI)*

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
REDIS_URL=redis://127.0.0.1:6379
---

### Frontend Setup (Optional)

1. Navigate to the frontend project directory:
cd contact-notes-frontend

2. Install frontend dependencies:
npm install

3. Create a ".env" file in the frontend directory:
*(Already created, no need to modify unless needed)*

PORT=3001
---

## Running the Application

### Development Mode
- To run both backend and frontend concurrently: (from the backend root "contact-notes-system")
npm run dev:all 

- To run just the backend individually:
cd contact-notes-system
npm run dev


- To run just the frontend individually:
cd contact-notes-frontend
npm run frontend
---

### Production Mode

- Build and start the backend:
cd contact-notes-system
npm run build
npm start


- Build the frontend:
cd contact-notes-frontend
npm run build
---

## API Documentation

Once the backend server is running, access the Swagger API documentation at:

http://localhost:3000/api-docs
---

## Authentication

Default login credentials for testing:

-  Username:  admin
-  Password:  password123
---

## Testing

- Run all tests:
cd contact-notes-system
npm run test

- Run tests with coverage report:
cd contact-notes-system
npm run test:coverage
---

## Contact

For any queries or support, please reach out to:

 Email:  saikishore.bhadragiri04@gmail.com

Thank you!

---