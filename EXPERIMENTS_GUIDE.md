# Complete Experiments Documentation

## All 20 Experiments Summary

### FRONTEND (Exp 1-6)
- **Exp 1**: React Components - State management, hooks, events
- **Exp 2**: Functional Components & Hooks - Props, defaults, custom patterns
- **Exp 3**: React Router - Multi-page routing, params, nested routes
- **Exp 4**: Material-UI - Enterprise components, theming, responsive design
- **Exp 5**: Bootstrap - CSS framework, responsive grid, utilities
- **Exp 6**: Axios API - HTTP requests, error handling, data fetching

### DATABASE (Exp 7-9)
- **Exp 7**: MongoDB Design - Schema modeling, relationships, collections
- **Exp 8**: MongoDB CRUD - Create, Read, Update, Delete, aggregation
- **Exp 9**: MongoDB Atlas - Cloud database, Node.js driver, sorting/filtering

### BACKEND (Exp 10-15)
- **Exp 10**: Express Basics - GET, POST, PUT, DELETE routes
- **Exp 11**: Express Router - Modular routing, multiple resources
- **Exp 12**: JWT Auth - Token generation, protected routes, verification
- **Exp 13**: JWT Expiry - Token expiration, refresh tokens, logout
- **Exp 14**: Role-Based Auth - User roles, access control, admin features
- **Exp 15**: File Operations - Create, read, update, delete files

### ADVANCED (Exp 16-20)
- **Exp 16**: Full Stack Auth - Frontend + backend integration, protected routes
- **Exp 17**: GraphQL - Queries, mutations, schema, Apollo Server
- **Exp 18**: TypeScript - Typed components, interfaces, custom hooks
- **Exp 19**: Testing - Unit tests, integration tests, API tests
- **Exp 20**: Cloud Deployment - Docker, CI/CD, Azure deployment

---

## Quick Start

### Installation

```bash
# Root project
npm install

# Individual experiments (if separate package.json)
cd experiments/exp10-express-basics
npm install express

cd experiments/exp12-jwt-auth
npm install jsonwebtoken

cd experiments/exp17-graphql
npm install apollo-server-express graphql
```

### Running Experiments

**Frontend React Apps** (Experiments 1-6):
```bash
# From root
npm start
# Opens at localhost:3000
```

**Backend Servers** (Experiments 10-20):
```bash
# Each runs on different port
node experiments/exp10-express-basics/server.js    # Port 3001
node experiments/exp11-express-router/server.js    # Port 3002
node experiments/exp12-jwt-auth/server.js          # Port 3003
node experiments/exp13-jwt-expiry/server.js        # Port 3004
node experiments/exp14-role-based-auth/server.js   # Port 3005
node experiments/exp15-file-operations/server.js   # Port 3006
node experiments/exp16-full-stack-auth/server.js   # Port 3007
node experiments/exp17-graphql/server.js           # Port 4000
```

---

## Technology Stack

### Frontend
- React 19.x with Hooks
- React Router v6
- Material-UI (MUI)
- Bootstrap 5
- Axios
- TypeScript

### Backend
- Express.js
- JWT Authentication
- Node.js file system
- GraphQL / Apollo Server
- MongoDB Driver

### Testing
- Jest
- React Testing Library
- Supertest

### DevOps
- Docker
- GitHub Actions
- Azure App Service
- MongoDB Atlas

---

## API Endpoints Reference

### Exp 10: Express Basics (Port 3001)
```
GET    /api/products
GET    /api/products/:id
GET    /api/products/category/:cat
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Exp 11: Express Router (Port 3002)
```
/api/users    - GET, POST, PUT, DELETE
/api/posts    - GET, POST, PUT, DELETE
/api/comments - GET, POST, DELETE
```

### Exp 12: JWT Auth (Port 3003)
```
POST   /api/login
GET    /api/profile (protected)
GET    /api/users (protected)
PUT    /api/profile (protected)
GET    /api/dashboard (protected)
```

### Exp 13: JWT with Expiry (Port 3004)
```
POST   /api/login
POST   /api/refresh-token
POST   /api/logout
POST   /api/token-info
GET    /api/dashboard (protected)
```

### Exp 14: RBAC (Port 3005)
```
PUBLIC:
  GET /api/public/posts

USER (authenticated):
  GET /api/user/profile
  GET /api/user/posts

MODERATOR:
  GET /api/moderator/reports
  POST /api/moderator/approve
  POST /api/moderator/reject

ADMIN:
  GET /api/admin/users
  POST /api/admin/users
  DELETE /api/admin/users/:id
  PUT /api/admin/users/:id/role
  GET /api/admin/dashboard
```

### Exp 15: File Operations (Port 3006)
```
GET    /api/files
GET    /api/files/:filename
GET    /api/files/:filename/stats
POST   /api/files/write
PUT    /api/files/:filename
DELETE /api/files/:filename
POST   /api/files/:filename/append
```

### Exp 17: GraphQL (Port 4000)
```
POST /graphql
- Query: students, courses, studentsByGrade
- Mutation: createStudent, updateStudent, enrollStudent
```

---

## Test Credentials

### Exp 12, 13, 14, 16 (Authentication)
```
Username: alice
Password: password123
Role: user (or admin/moderator for Exp 14)
```

---

## File Structure

```
experiments/
├── exp1-react-components/
│   ├── PassengerList.js
│   ├── StudentAttendance.js
│   ├── Timer.js
│   ├── CourseList.js
│   ├── App.js
│   └── README.md
│
├── exp10-express-basics/
│   ├── server.js
│   └── README.md
│
├── exp12-jwt-auth/
│   ├── server.js
│   └── .env.example
│
├── exp16-full-stack-auth/
│   ├── server.js
│   ├── ProtectedComponents.js
│   └── README.md
│
├── exp17-graphql/
│   ├── server.js
│   └── queries-mutations.graphql
│
├── exp18-typescript/
│   ├── App.tsx
│   ├── tsconfig.json
│   └── README.md
│
├── exp19-testing/
│   ├── tests.js
│   ├── jest.config.js
│   └── README.md
│
└── exp20-cloud-deployment/
    ├── Dockerfile
    ├── docker-compose.yml
    ├── DEPLOYMENT_GUIDE.md
    └── .github/workflows/deploy.yml
```

---

## Common Patterns

### Error Handling
```javascript
try {
  const result = await operation();
  res.json({ success: true, data: result });
} catch (error) {
  res.status(500).json({ success: false, message: error.message });
}
```

### Protected Routes
```javascript
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ success: false });
  }
};

app.get('/protected', verifyToken, (req, res) => { ... });
```

### Async/Await Pattern
```javascript
export async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## Best Practices

1. **Security**
   - Use HTTPS in production
   - Validate all inputs
   - Use environment variables for secrets
   - Implement rate limiting

2. **Error Handling**
   - Consistent error responses
   - Proper HTTP status codes
   - Meaningful error messages
   - Log errors for debugging

3. **Performance**
   - Use indexes for database queries
   - Implement caching
   - Optimize API responses
   - Use pagination

4. **Code Quality**
   - Write unit tests
   - Use TypeScript for type safety
   - Follow naming conventions
   - Add documentation

5. **DevOps**
   - Use CI/CD pipelines
   - Containerize applications
   - Monitor and log
   - Implement auto-scaling

---

## Dependencies by Experiment

```javascript
// Core
"react": "^19.0.0",
"react-dom": "^19.0.0",
"react-router-dom": "^6.0.0",

// UI
"@mui/material": "^5.0.0",
"bootstrap": "^5.0.0",

// API
"axios": "^1.0.0",
"express": "^4.18.0",

// Database
"mongodb": "^5.0.0",

// Auth
"jsonwebtoken": "^9.0.0",
"bcryptjs": "^2.4.3",

// GraphQL
"apollo-server-express": "^4.0.0",
"graphql": "^16.0.0",

// TypeScript
"typescript": "^5.0.0",

// Testing
"jest": "^29.0.0",
"@testing-library/react": "^14.0.0",
"supertest": "^6.0.0"
```

---

## Performance Metrics

| Experiment | Frontend | Backend | Database |
|-----------|----------|---------|----------|
| Exp 1 | ✓ | - | - |
| Exp 6 | ✓ API | - | ✓ |
| Exp 10 | - | ✓ CRUD | - |
| Exp 12 | - | ✓ Auth | - |
| Exp 16 | ✓ Auth | ✓ Auth | - |
| Exp 17 | - | ✓ GraphQL | ✓ |
| Exp 20 | - | ✓ Cloud | ✓ Cloud |

---

## Learning Path

1. **Basics** (Exp 1-3): Learn React fundamentals
2. **Styling** (Exp 4-5): Master UI frameworks
3. **Data** (Exp 6-9): Master HTTP and databases
4. **Backend** (Exp 10-15): Build Express servers
5. **Full Stack** (Exp 16): Connect frontend & backend
6. **Advanced** (Exp 17-18): GraphQL and TypeScript
7. **Quality** (Exp 19): Testing
8. **Production** (Exp 20): Deployment

---

## Deployment Steps

1. Review Exp 20 Cloud Deployment guide
2. Install Azure CLI
3. Create resource group
4. Build Docker image
5. Push to container registry
6. Deploy to App Service
7. Configure environment variables
8. Set up monitoring
9. Test deployed app

---

## Support & Resources

- React Documentation: https://react.dev
- Express.js: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- GraphQL: https://graphql.org
- TypeScript: https://www.typescriptlang.org
- Azure: https://azure.microsoft.com/docs

---

## Completion Status

✅ **20/20 Experiments Complete**

All experiments created with:
- Production-ready code
- Comprehensive documentation
- Working examples
- Best practices implemented
- Error handling included
- Testing strategies provided

Ready for GitHub push!
