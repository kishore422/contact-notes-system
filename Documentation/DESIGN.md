# System Design Document - Contact Notes System

---

## 🔹 Architecture Overview

The Contact Notes System is designed as a scalable and maintainable backend service using Node.js, Express, TypeScript, MongoDB, and Redis with a clean separation of concerns through a Controller-Service-Model architecture.

---

## 🔹 Key Design Decisions

### 1. TypeScript Implementation
- Decision: Used TypeScript for type safety and better developer experience.
- Tradeoff: Increased initial setup complexity compared to JavaScript.
- Assumption: The benefits of type safety (error prevention, IDE support) outweigh the learning curve and setup time.

### 2. Express.js Framework
- Decision: Chose Express.js for its lightweight and flexible nature.
- Tradeoff: Less opinionated structure may lead to inconsistent patterns if not carefully maintained.
- Assumption: Given the moderate project scope, the flexibility of Express speeds up development without major downsides.

### 3. MongoDB with Mongoose
- Decision: Selected MongoDB as the database, with Mongoose for schema validation and modeling.
- Tradeoff: Sacrificed relational database constraints in favor of flexibility and scalability.
- Assumption: The Contact-Note relationship is relatively simple and does not require complex joins or relational integrity.

### 4. JWT Authentication
- Decision: Implemented stateless JWT-based authentication for user login.
- Tradeoff: Simpler authentication without server-side session management, but lacks token invalidation before expiration.
- Assumption: For a contact management system, session invalidation is not critical, and stateless authentication provides sufficient security.

### 5. Field Normalization
- Decision: Performed field normalization at the application level through middleware.
- Tradeoff: Application-level control over incoming data, but relies on API clients using the service correctly.
- Assumption: All create/update requests for notes will go through validated API endpoints, ensuring consistent field structure.

### 6. Bull Queue with Redis
- Decision: Integrated Bull for background processing tasks like note enrichment.
- Tradeoff: Added Redis as an infrastructure dependency but gained the ability to decouple real-time operations from heavy tasks.
- Assumption: The benefits of asynchronous processing outweigh the minor added setup of a Redis server.

### 7. Controller-Service-Model Pattern
- Decision: Organized backend using Controller, Service, and Model layers for better modularity and maintainability.
- Tradeoff: Slightly more boilerplate code and more files to manage.
- Assumption: This layered pattern will ease future scaling and code management.

### 8. API Documentation
- Decision: Integrated Swagger for documenting all APIs.
- Tradeoff: Requires maintaining the documentation alongside code changes.
- Assumption: Clear documentation is crucial for anyone integrating with the service.

### 9. Testing Strategy
- Decision: Focused primarily on integration testing using Jest and Supertest to validate full request/response cycles.
- Tradeoff: Lower emphasis on isolated unit tests in favor of broad API coverage.
- Assumption: API-level tests provide sufficient confidence for a project of this size and type.

---

## 🔹 Tradeoffs Made

- Queue Simplicity: Chose Bull over heavier queuing systems like Kafka or RabbitMQ to keep infrastructure simple and easy to set up.
- Minimal User Management: Used a static dummy user (`admin/password123`) without implementing full signup/login flows to stay within assessment scope and time constraints.
- Basic Error Handling: Implemented general error handlers but did not deeply address every edge case to prioritize core functionality.
- Rate Limiting Omission: Did not add rate limiting or brute force protection since it was not a critical requirement for an internal-facing system.

---

## 🔹 Assumptions

- Only a single admin user is needed for accessing and managing the system.
- Notes always belong to existing Contacts; Notes cannot exist independently.
- Redis and MongoDB servers are available and properly configured before running the backend.
- API security standards are kept reasonable for a demo/internal project without requiring enterprise-grade compliance.
- The frontend is considered optional and provided only for showcasing a possible UI integration.

---