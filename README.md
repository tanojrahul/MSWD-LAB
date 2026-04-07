# MSWD Lab — Complete Web Development Experiments

A comprehensive interactive learning platform featuring **20 hands-on experiments** covering React, Node.js, MongoDB, APIs, Authentication, GraphQL, TypeScript, Testing, and Cloud Deployment.

## 🚀 Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Features

### Home Page with Experiment Cards
Navigate to the home page to see all 20 experiments organized by category:
- **🔵 Frontend (Exp 1-6)**: React components, hooks, routing, Material-UI, Bootstrap, Axios
- **🟢 Database (Exp 7-9)**: MongoDB schema design, CRUD, Atlas cloud
- **🟠 Backend (Exp 10-15)**: Express, JWT auth, RBAC, file operations
- **🟣 Advanced (Exp 16-20)**: Full-stack auth, GraphQL, TypeScript, testing, cloud deployment

Each card shows:
- Experiment number and category badge
- Brief description of what is learned
- Quick preview of key topics

### Experiment Pages with Dual Tabs

Click any experiment card to open its detail page with two tabs:

#### 📋 Details Tab
- **Objective**: Clear learning goal
- **Tasks**: 4+ hands-on tasks to complete
- **Key Concepts**: Technologies and patterns covered
- **Source Files**: Links to implementation files

#### ▶ Live Output Tab
Interactive demonstrations for each experiment:

**Frontend (Exp 1-6)**: Live, fully functional components
- Passenger List with add/remove
- Student Attendance tracking with stats
- Timer with start/pause/reset
- Course catalog with filtering
- User cards with profiles
- API consumers with mock data

**Backend & Database (Exp 7-20)**: Animated terminal-style output
- MongoDB commands and responses
- Express API routes and responses
- JWT authentication flow
- Role-based access control
- GraphQL queries and mutations
- TypeScript compilation
- Test suite results
- Docker and Azure deployment commands

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder (minified and optimized).

## 📖 Complete 20 Experiments

### Frontend (React) — Exp 1–6
| # | Title | Key Topics |
|---|-------|-----------|
| 1 | React Components | Components, JSX, props, state, event handling |
| 2 | Hooks & State | useState, default props, conditional rendering |
| 3 | React Router | Routes, nested routing, URL parameters |
| 4 | Material-UI | MUI components, theming, dark mode |
| 5 | Bootstrap | Grid system, responsive design, utilities |
| 6 | Axios & API | HTTP requests, error handling, data fetching |

### Database — Exp 7–9
| # | Title | Key Topics |
|---|-------|-----------|
| 7 | MongoDB Design | Schema modeling, relationships, collections |
| 8 | MongoDB CRUD | insertMany, find, updateOne, deleteOne |
| 9 | MongoDB Atlas | Cloud database, Node.js driver, sorting |

### Backend (Express) — Exp 10–15
| # | Title | Key Topics |
|---|-------|-----------|
| 10 | Express Basics | GET, POST, PUT, DELETE routes |
| 11 | Express Router | Modular routing, multiple resources |
| 12 | JWT Auth | Token generation, protected routes |
| 13 | JWT Expiry | Access/refresh tokens, revocation |
| 14 | Role-Based Auth | Admin, user, moderator roles & RBAC |
| 15 | File Operations | Create, read, update, delete files |

### Advanced — Exp 16–20
| # | Title | Key Topics |
|---|-------|-----------|
| 16 | Full Stack Auth | React + Express + JWT integration |
| 17 | GraphQL | Schema, queries, mutations, Apollo |
| 18 | TypeScript | Interfaces, typed components, type safety |
| 19 | Testing | Jest, React Testing Library, unit tests |
| 20 | Cloud Deployment | Docker, CI/CD, Azure App Service |

## 📁 Project Structure

```
src/
├── App.js
├── pages/
│   ├── Home.js              # 20 experiment cards
│   └── ExperimentPage.js    # Details + Output tabs
├── outputs/
│   ├── Exp1Output.js        # Interactive components for Exp 1
│   ├── Exp2Output.js        # Interactive components for Exp 2
│   ├── Exp3Output.js        # Interactive components for Exp 3
│   ├── Exp4Output.js        # Train reservation form
│   ├── Exp5Output.js        # Jobs catalog
│   ├── Exp6Output.js        # API consumers
│   └── ServerOutputs.js     # Terminal outputs (Exp 7-20)
└── [Create React App files]

experiments/
├── exp1-react-components/   # PassengerList, StudentAttendance, Timer, CourseList
├── exp2-hooks-and-state/    # Greeting, UserCard, Counter, Toggle
├── exp3-react-router/       # Home, Friends, Posts, Chat, Login, Hospital
├── exp4-material-ui/        # Train Reservation Form, Theme Customization
├── exp5-bootstrap/          # Jobs Catalog, Bootstrap Components
├── exp6-axios-api/          # API Consumers
... (and so on through exp20)
```

## 🎯 How to Use

1. **Run the app**: `npm start` — Opens at http://localhost:3000
2. **Browse**: See all 20 experiments with color-coded categories
3. **Click Card**: Open experiment detail page
4. **Read Details**: Tab 1 shows objectives, tasks, concepts, files
5. **See Output**: Tab 2 shows live, interactive demonstrations
6. **Learn**: Study the experiment files in `experiments/` folder

## 🎓 Learning Path

**Phase 1: Frontend Fundamentals**
- Exp 1: Basic React components and state
- Exp 2: Hooks and functional component patterns
- Exp 3: Client-side routing with React Router

**Phase 2: Modern UI Frameworks**
- Exp 4: Material-UI enterprise components
- Exp 5: Bootstrap responsive design

**Phase 3: External Data**
- Exp 6: HTTP requests with Axios

**Phase 4: Database Layer**
- Exp 7: Schema design and modeling
- Exp 8: CRUD operations
- Exp 9: MongoDB Atlas cloud integration

**Phase 5: Backend Services**
- Exp 10: Express fundamentals
- Exp 11: Modular routing
- Exp 12-15: Authentication & authorization

**Phase 6: Advanced Topics**
- Exp 16: Full-stack integration
- Exp 17: GraphQL APIs
- Exp 18: Type-safe TypeScript
- Exp 19: Testing
- Exp 20: Production deployment

## 🛠 Technologies Used

| Category | Technologies |
|----------|--------------|
| Frontend | React 19, React Router v6, Material-UI, Bootstrap 5 |
| Backend | Node.js, Express.js, JWT, GraphQL, Apollo |
| Database | MongoDB (local), MongoDB Atlas (cloud) |
| Testing | Jest, React Testing Library, Supertest |
| Deployment | Docker, GitHub Actions, Azure App Service |
| Language | JavaScript, TypeScript |

## 📝 Features

✅ Interactive live outputs for frontend experiments (React components with state)
✅ Simulated terminal outputs for backend/database experiments
✅ Animated typewriter effect for command outputs
✅ Glassmorphism design on dark gradient background
✅ Responsive cards with hover effects
✅ Tabbed interface for details vs live output
✅ All 20 experiments accessible from one dashboard
✅ Mobile-friendly responsive layout

## 💡 Notes

- Frontend outputs (Exp 1-6) are fully interactive React components
- Backend outputs (Exp 7-20) show realistic terminal simulations
- Each experiment is self-contained in the `experiments/` folder
- Source code is fully commented and beginner-friendly
- No backend server required — all UI-based demonstration

