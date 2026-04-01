# Experiments 10-15: Express & Backend Development

## Overview
Experiments 10-15 cover Express.js server development with advanced features:
- Express basics with CRUD APIs
- Modular routing structure
- JWT authentication
- Token expiration and refresh
- Role-based access control
- File operations

---

## Experiment 10: Express Basics

**File:** server.js (Port 3001)

### Features:
- Basic Express setup
- GET all products
- GET single product by ID
- Filter products by category
- POST create new product
- PUT update product
- DELETE product

### API Endpoints:
```
GET    /api/products
GET    /api/products/:id
GET    /api/products/category/:cat
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

---

## Experiment 11: Express Router

**File:** server.js (Port 3002)

### Features:
- Modular routing structure
- Separate routers for Users, Posts, Comments
- RESTful API design
- CRUD operations for each resource

### API Endpoints:
```
/api/users     - User management
/api/posts     - Blog posts
/api/comments  - Comments on posts
```

---

## Experiment 12: JWT Authentication

**File:** server.js (Port 3003)

### Features:
- User login with token generation
- Protected routes with middleware
- Token verification
- Access control

### API Endpoints:
```
POST   /api/login - Login and get token
GET    /api/profile - Get user profile (protected)
GET    /api/users - Get all users (protected)
PUT    /api/profile - Update profile (protected)
GET    /api/dashboard - Dashboard access (protected)
```

### Test User:
- Username: alice
- Password: password123

---

## Experiment 13: JWT with Token Expiry

**File:** server.js (Port 3004)

### Features:
- Access token (15 minutes expiry)
- Refresh token (7 days expiry)
- Token refresh endpoint
- Token information decoder
- Logout/revoke functionality

### API Endpoints:
```
POST   /api/login - Login
POST   /api/refresh-token - Get new access token
POST   /api/logout - Revoke refresh token
POST   /api/token-info - Decode token
GET    /api/dashboard - Protected route
```

### Token Types:
- **Access Token:** Short-lived (15 min), for API access
- **Refresh Token:** Long-lived (7 days), for getting new access token

---

## Experiment 14: Role-Based Access Control

**File:** server.js (Port 3005)

### Roles:
- **Admin:** Full system access
- **Moderator:** Content moderation
- **User:** Basic access

### API Endpoints:
```
PUBLIC:
  GET /api/public/posts

USER (Requires login):
  GET /api/user/profile
  GET /api/user/posts

MODERATOR (moderator + admin):
  GET /api/moderator/reports
  POST /api/moderator/approve
  POST /api/moderator/reject

ADMIN ONLY:
  GET /api/admin/users
  POST /api/admin/users
  DELETE /api/admin/users/:id
  PUT /api/admin/users/:id/role
  GET /api/admin/dashboard
```

### Test Users:
- `admin / admin123` - Admin role
- `moderator / mod123` - Moderator role
- `user / user123` - User role

---

## Experiment 15: File Operations

**File:** server.js (Port 3006)

### Features:
- Create files
- Read file content
- List all files with stats
- Update file content
- Delete files
- Append to files
- Get file statistics

### API Endpoints:
```
GET    /api/files - List all files
GET    /api/files/:filename - Read file
GET    /api/files/:filename/stats - File statistics
POST   /api/files/write - Create/write file
PUT    /api/files/:filename - Update file
DELETE /api/files/:filename - Delete file
POST   /api/files/:filename/append - Append to file
```

### File Storage:
- All files stored in `./uploads` directory
- Uses Node.js fs module with Promises API

---

## Installation

All experiments use Express and may require JWT:

```bash
npm install express
npm install jsonwebtoken  # For experiments 12-14
```

---

## Running the Servers

Each experiment is a standalone server. Run individually:

```bash
# Experiment 10
node experiments/exp10-express-basics/server.js

# Experiment 11
node experiments/exp11-express-router/server.js

# Experiment 12
node experiments/exp12-jwt-auth/server.js

# Experiment 13
node experiments/exp13-jwt-expiry/server.js

# Experiment 14
node experiments/exp14-role-based-auth/server.js

# Experiment 15
node experiments/exp15-file-operations/server.js
```

---

## Common Patterns

### Error Handling
```javascript
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: error.message
  });
});
```

### File Operations
```javascript
const fs = require('fs').promises;
await fs.writeFile(path, content, 'utf-8');
const files = await fs.readdir(dir);
```

### Middleware
```javascript
const middleware = (req, res, next) => {
  // Process request
  next();  // Pass to next middleware
};

app.use(middleware);
```

---

## Testing with cURL

### Create Product
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":999,"category":"Electronics"}'
```

### Login
```bash
curl -X POST http://localhost:3003/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"password123"}'
```

### Protected Route (with token)
```bash
curl http://localhost:3003/api/profile \
  -H "Authorization: Bearer eyJhbGc..."
```

---

## Best Practices

1. **Security:**
   - Use HTTPS in production
   - Validate all inputs
   - Never log sensitive data
   - Use environment variables for secrets

2. **Error Handling:**
   - Return proper HTTP status codes
   - Include error messages in response
   - Log errors for debugging

3. **Code Organization:**
   - Use separate router files
   - Create middleware for common tasks
   - Keep route handlers simple

4. **API Design:**
   - Follow RESTful conventions
   - Use consistent response format
   - Version your API

---

## Environment Setup

Create `.env` file for sensitive data:
```
PORT=3000
SECRET_KEY=your-secret-key
DB_URL=mongodb+srv://...
```

Load in Express:
```javascript
require('dotenv').config();
const SECRET = process.env.SECRET_KEY;
```

---

## Deployment Considerations

1. Use process manager (PM2)
2. Enable CORS if needed
3. Add rate limiting
4. Implement logging
5. Use database for persistent storage
6. Set up monitoring

---

## Learning Objectives
✓ Create Express servers with multiple routes
✓ Implement JWT authentication
✓ Handle token expiration and refresh
✓ Implement role-based access control
✓ Perform file operations
✓ Build RESTful APIs
✓ Use middleware effectively
✓ Handle errors gracefully

---

## Next Steps
- Add database integration (MongoDB)
- Implement pagination
- Add request validation
- Implement caching
- Add comprehensive logging
- Deploy to cloud platform
