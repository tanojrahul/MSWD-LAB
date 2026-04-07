import React, { useState, Suspense, lazy } from "react";
import { useParams, Link } from "react-router-dom";

// Lazy-load output components for each experiment
const outputMap = {
  1:  lazy(() => import('../outputs/Exp1Output')),
  2:  lazy(() => import('../outputs/Exp2Output')),
  3:  lazy(() => import('../outputs/Exp3Output')),
  4:  lazy(() => import('../outputs/Exp4Output')),
  5:  lazy(() => import('../outputs/Exp5Output')),
  6:  lazy(() => import('../outputs/Exp6Output')),
  7:  lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp7Output  }))),
  8:  lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp8Output  }))),
  9:  lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp9Output  }))),
  10: lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp10Output }))),
  11: lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp11Output }))),
  12: lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp12Output }))),
  13: lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp13Output }))),
  14: lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp14Output }))),
  15: lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp15Output }))),
  16: lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp16Output }))),
  17: lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp17Output }))),
  18: lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp18Output }))),
  19: lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp19Output }))),
  20: lazy(() => import('../outputs/ServerOutputs').then(m => ({ default: m.Exp20Output }))),
};

const experimentData = {
  1: {
    title: "React Components",
    category: "Frontend",
    color: "#4FC3F7",
    objective:
      "Learn to build reusable React components using JSX, props, and state management with hooks.",
    tasks: [
      "Create a PassengerList component that displays traveler details (name, mobile, source, destination, date) in a styled table.",
      "Build a StudentAttendance component with toggle functionality to mark students present/absent.",
      "Implement a Timer component using useEffect for automatic countdown.",
      "Create a CourseList component to render a dynamic list of courses with details.",
    ],
    concepts: ["JSX & Component Composition", "Props & State", "useState Hook", "Event Handling", "List Rendering with .map()"],
    files: ["App.js", "PassengerList.js", "StudentAttendance.js", "Timer.js", "CourseList.js"],
  },
  2: {
    title: "Functional Components & Hooks",
    category: "Frontend",
    color: "#4FC3F7",
    objective:
      "Explore functional component patterns including default props, conditional rendering, and interactive state updates.",
    tasks: [
      "Build a Greeting component that personalizes messages using props with default values.",
      "Create a UserCard component displaying user profile information.",
      "Implement a Counter component with increment, decrement, and reset functionality.",
      "Build a Toggle component that switches visibility of content on button click.",
    ],
    concepts: ["Functional Components", "Default Props", "useState Patterns", "Conditional Rendering", "Event Handlers"],
    files: ["App.js", "Greeting.js", "UserCard.js", "Counter.js", "Toggle.js"],
  },
  3: {
    title: "React Router",
    category: "Frontend",
    color: "#4FC3F7",
    objective:
      "Implement client-side navigation with React Router including nested routes and URL parameters.",
    tasks: [
      "Set up React Router with routes for Home, Friends, Posts, Chat, and Login pages.",
      "Create a Hospital Management page with nested routing and dynamic URL parameters.",
      "Build a navigation bar with Link components for seamless page transitions.",
      "Implement route parameters to display dynamic content based on the URL.",
    ],
    concepts: ["BrowserRouter & Routes", "Link & NavLink", "Route Parameters", "Nested Routes", "Outlet Component"],
    files: ["App.js", "pages/Home.js", "pages/Friends.js", "pages/Posts.js", "pages/Chat.js", "pages/Login.js", "pages/HospitalManagement.js"],
  },
  4: {
    title: "Material-UI Components",
    category: "Frontend",
    color: "#4FC3F7",
    objective:
      "Integrate Material-UI for enterprise-grade UI components with theming and responsive design.",
    tasks: [
      "Build a responsive navigation bar using MUI AppBar and Toolbar.",
      "Create a Train Reservation Form with TextField, Select, and DatePicker components.",
      "Implement theme customization with light/dark mode toggle.",
      "Showcase MUI components: Cards, Buttons, Chips, and Typography.",
    ],
    concepts: ["MUI Components", "ThemeProvider", "createTheme", "Responsive AppBar", "Form Components"],
    files: ["App.js", "ResponsiveNavBar.js", "TrainReservationForm.js", "ThemeCustomization.js", "MaterialUIComponents.js"],
  },
  5: {
    title: "Bootstrap Integration",
    category: "Frontend",
    color: "#4FC3F7",
    objective:
      "Use Bootstrap for responsive, mobile-first web design with grid system and utility classes.",
    tasks: [
      "Create a responsive navigation bar using Bootstrap classes.",
      "Build a Jobs Catalog with filtering, sorting, and responsive card grid.",
      "Implement Bootstrap theme switching between light and dark modes.",
      "Use Bootstrap grid system to create responsive multi-column layouts.",
    ],
    concepts: ["Bootstrap Grid System", "Responsive Design", "Card Components", "Navbar", "Utility Classes"],
    files: ["App.js", "BootstrapNavBar.js", "JobsCatalog.js", "BootstrapThemes.js"],
  },
  6: {
    title: "Axios & API Integration",
    category: "Frontend",
    color: "#4FC3F7",
    objective:
      "Fetch and display data from REST APIs using Axios with proper loading states and error handling.",
    tasks: [
      "Fetch and display user profile data from a public API using Axios GET.",
      "Build a Product API Consumer to list products from an external API.",
      "Create an AddStudentForm that sends POST requests to submit student data.",
      "Implement a Customer API Consumer with nested data fetching and display.",
    ],
    concepts: ["Axios GET/POST requests", "useEffect for Data Fetching", "Loading & Error States", "Async/Await", "API Response Handling"],
    files: ["App.js", "ProfileData.js", "ProductAPIConsumer.js", "AddStudentForm.js", "CustomerAPIConsumer.js"],
  },
  7: {
    title: "MongoDB Database Design",
    category: "Database",
    color: "#81C784",
    objective:
      "Design MongoDB schemas for real-world applications with proper relationships and aggregation pipelines.",
    tasks: [
      "Design a Travel Agency schema with Customers, Bookings, Destinations, and Payments collections.",
      "Design an Event Platform schema with Events, Users, Registrations, and Feedback collections.",
      "Define relationships between collections using references and embedded documents.",
      "Write aggregation pipeline queries for reporting and analytics.",
    ],
    concepts: ["Collection Design", "Document Relationships", "Embedded vs Referenced", "Aggregation Pipelines", "Schema Modeling"],
    files: ["TravelAgencySchema.js", "EventPlatformSchema.js"],
  },
  8: {
    title: "MongoDB CRUD Operations",
    category: "Database",
    color: "#81C784",
    objective:
      "Perform complete CRUD operations on MongoDB with filters, projections, and update operators.",
    tasks: [
      "Insert single and multiple documents using insertOne and insertMany.",
      "Query documents with filters, projections, and comparison operators ($gt, $lt, $eq).",
      "Update documents using $set, $inc, $push operators with updateOne and updateMany.",
      "Delete documents with conditions using deleteOne and deleteMany.",
    ],
    concepts: ["insertOne / insertMany", "find with Filters", "Update Operators ($set, $inc)", "Delete Operations", "Comparison & Logical Operators"],
    files: ["MongoCRUDOperations.js"],
  },
  9: {
    title: "MongoDB Atlas Cloud",
    category: "Database",
    color: "#81C784",
    objective:
      "Connect to MongoDB Atlas cloud service and perform operations using Node.js driver.",
    tasks: [
      "Set up MongoDB Atlas cluster and configure connection strings.",
      "Perform CRUD operations using the Node.js MongoDB driver.",
      "Implement sorting, filtering, and aggregation pipelines.",
      "Use MongoDB Shell commands for interactive database operations.",
    ],
    concepts: ["MongoDB Atlas Setup", "Connection String", "Node.js Driver", "Sorting & Filtering", "Shell Commands"],
    files: ["mongoAtlasConnection.js", "mongoShellCommands.js"],
  },
  10: {
    title: "Express.js Basics",
    category: "Backend",
    color: "#FFB74D",
    objective:
      "Build a RESTful API server with Express.js supporting all HTTP methods.",
    tasks: [
      "Create an Express server listening on Port 3001.",
      "Implement GET routes to fetch all products and a single product by ID.",
      "Add POST route to create new products with request body parsing.",
      "Implement PUT and DELETE routes for updating and removing products.",
    ],
    concepts: ["Express Server Setup", "HTTP Methods", "Route Parameters", "Request Body Parsing", "JSON Responses"],
    files: ["server.js"],
  },
  11: {
    title: "Express Router",
    category: "Backend",
    color: "#FFB74D",
    objective:
      "Organize Express routes into modular Router instances for scalable API architecture.",
    tasks: [
      "Create separate Router instances for Users, Posts, and Comments.",
      "Implement full CRUD endpoints for each resource.",
      "Mount routers on specific path prefixes (/users, /posts, /comments).",
      "Test the modular routing structure on Port 3002.",
    ],
    concepts: ["express.Router()", "Modular Routing", "Route Mounting", "RESTful Design", "Resource Separation"],
    files: ["server.js"],
  },
  12: {
    title: "JWT Authentication",
    category: "Backend",
    color: "#FFB74D",
    objective:
      "Implement JSON Web Token authentication with login and protected route middleware.",
    tasks: [
      "Create a login endpoint that validates credentials and returns a JWT.",
      "Build authentication middleware to verify tokens on protected routes.",
      "Implement a protected /dashboard route accessible only with valid tokens.",
      "Handle token verification errors with proper HTTP status codes.",
    ],
    concepts: ["JWT Generation (jsonwebtoken)", "Token Verification", "Auth Middleware", "Protected Routes", "Bearer Token Pattern"],
    files: ["server.js"],
  },
  13: {
    title: "JWT Token Expiry",
    category: "Backend",
    color: "#FFB74D",
    objective:
      "Extend JWT authentication with token expiration, refresh tokens, and token revocation.",
    tasks: [
      "Set access token expiry to 15 minutes and refresh token to 7 days.",
      "Create a /refresh endpoint to issue new access tokens using refresh tokens.",
      "Implement a /decode endpoint to inspect token contents and expiry.",
      "Build /logout endpoint to revoke refresh tokens.",
    ],
    concepts: ["Token Expiration", "Refresh Tokens", "Token Revocation", "expiresIn Option", "Token Decode"],
    files: ["server.js"],
  },
  14: {
    title: "Role-Based Access Control",
    category: "Backend",
    color: "#FFB74D",
    objective:
      "Implement role-based authorization restricting endpoints based on user roles.",
    tasks: [
      "Define user roles: admin, user, and moderator with different permissions.",
      "Create middleware that checks user roles before granting access.",
      "Build admin-only, moderator-only, and public endpoints.",
      "Combine JWT authentication with role-based authorization.",
    ],
    concepts: ["RBAC Pattern", "Role Middleware", "Authorization vs Authentication", "Access Levels", "Middleware Chaining"],
    files: ["server.js"],
  },
  15: {
    title: "File Operations",
    category: "Backend",
    color: "#FFB74D",
    objective:
      "Perform server-side file operations using Node.js fs module through Express API endpoints.",
    tasks: [
      "Create POST endpoint to write content to a file.",
      "Implement GET endpoint to read file contents.",
      "Build PUT endpoint to update/append file contents.",
      "Add DELETE endpoint to remove files from the server.",
    ],
    concepts: ["fs.promises API", "File Write/Read", "File Update/Delete", "Async File Operations", "Error Handling"],
    files: ["server.js"],
  },
  16: {
    title: "Full Stack Authentication",
    category: "Advanced",
    color: "#CE93D8",
    objective:
      "Build a complete authentication system with React frontend and Express backend.",
    tasks: [
      "Set up Express backend with user registration and login endpoints.",
      "Generate JWT tokens on login with 7-day expiry.",
      "Build React components for login form and protected dashboard.",
      "Store tokens in localStorage and attach to API requests.",
    ],
    concepts: ["Full Stack Integration", "CORS Configuration", "Token Storage", "Protected React Components", "Auth Flow"],
    files: ["server.js", "ProtectedComponents.js"],
  },
  17: {
    title: "GraphQL Server",
    category: "Advanced",
    color: "#CE93D8",
    objective:
      "Build a GraphQL API with Apollo Server featuring queries, mutations, and type relationships.",
    tasks: [
      "Define GraphQL schema with Student and Course types.",
      "Implement queries to fetch students and courses with relationships.",
      "Create mutations for adding new students and courses.",
      "Set up Apollo Server and test with GraphQL Playground.",
    ],
    concepts: ["GraphQL Schema", "Type Definitions", "Resolvers", "Queries & Mutations", "Apollo Server"],
    files: ["server.js"],
  },
  18: {
    title: "TypeScript React",
    category: "Advanced",
    color: "#CE93D8",
    objective:
      "Develop React components with TypeScript for type-safe, maintainable code.",
    tasks: [
      "Define TypeScript interfaces for User and Post data models.",
      "Create typed functional components with proper prop interfaces.",
      "Implement a UserProfile component with typed state and props.",
      "Build a PostList component demonstrating typed arrays and rendering.",
    ],
    concepts: ["TypeScript Interfaces", "Typed Components", "Prop Type Definitions", "Generic Types", "Type Safety"],
    files: ["App.tsx"],
  },
  19: {
    title: "Testing",
    category: "Advanced",
    color: "#CE93D8",
    objective:
      "Write comprehensive tests using Jest and React Testing Library for components and APIs.",
    tasks: [
      "Write unit tests for React component rendering and content.",
      "Test user interactions like button clicks and form submissions.",
      "Validate component behavior with different prop values.",
      "Write API endpoint tests using Supertest.",
    ],
    concepts: ["Jest Test Runner", "React Testing Library", "render & screen", "fireEvent", "Supertest"],
    files: ["tests.js"],
  },
  20: {
    title: "Cloud Deployment",
    category: "Advanced",
    color: "#CE93D8",
    objective:
      "Deploy a full-stack application to Azure using Docker and CI/CD pipelines.",
    tasks: [
      "Dockerize the React frontend and Express backend.",
      "Create Docker Compose configuration for multi-container setup.",
      "Set up CI/CD pipeline with GitHub Actions.",
      "Deploy to Azure App Service with environment configuration.",
    ],
    concepts: ["Dockerfile", "Docker Compose", "CI/CD Pipeline", "Azure App Service", "Environment Variables"],
    files: ["DEPLOYMENT_GUIDE.md"],
  },
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#fff",
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
  },
  backLink: {
    color: "#b0b0d0",
    textDecoration: "none",
    fontSize: 14,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 24,
    transition: "color 0.2s",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 32,
    flexWrap: "wrap",
  },
  expBadge: {
    fontSize: 16,
    fontWeight: 700,
    padding: "6px 16px",
    borderRadius: 24,
    color: "#fff",
  },
  categoryBadge: {
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.12)",
    color: "#ccc",
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    margin: 0,
    width: "100%",
    marginTop: 8,
  },
  section: {
    background: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: 24,
    marginBottom: 20,
    border: "1px solid rgba(255,255,255,0.08)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  objectiveText: {
    fontSize: 15,
    color: "#c0c0e0",
    lineHeight: 1.6,
    margin: 0,
  },
  taskList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  taskItem: {
    display: "flex",
    gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    fontSize: 14,
    color: "#c0c0e0",
    lineHeight: 1.5,
  },
  taskNum: {
    minWidth: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    color: "#fff",
    flexShrink: 0,
  },
  conceptsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  conceptChip: {
    fontSize: 13,
    padding: "6px 14px",
    borderRadius: 20,
    background: "rgba(255,255,255,0.08)",
    color: "#d0d0f0",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  fileChip: {
    fontSize: 13,
    padding: "6px 14px",
    borderRadius: 8,
    background: "rgba(255,255,255,0.05)",
    color: "#90CAF9",
    border: "1px solid rgba(144,202,249,0.2)",
    fontFamily: "'Consolas', 'Courier New', monospace",
  },
  notFound: {
    textAlign: "center",
    padding: "80px 20px",
  },
  tabBar: {
    display: "flex",
    gap: 10,
    marginBottom: 24,
  },
  tabBtn: {
    padding: "10px 24px",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 14,
    transition: "all 0.2s",
  },
};

export default function ExperimentPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const exp = experimentData[id];
  const OutputComponent = outputMap[Number(id)];

  if (!exp) {
    return (
      <div style={styles.page}>
        <div style={styles.notFound}>
          <h2>Experiment not found</h2>
          <Link to="/" style={{ ...styles.backLink, fontSize: 16 }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link
          to="/"
          style={styles.backLink}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#b0b0d0")}
        >
          ← Back to All Experiments
        </Link>

        <div style={styles.header}>
          <span style={{ ...styles.expBadge, background: exp.color }}>
            Experiment {id}
          </span>
          <span style={styles.categoryBadge}>{exp.category}</span>
          <h1 style={styles.title}>{exp.title}</h1>
        </div>

        {/* Tab Switcher */}
        <div style={styles.tabBar}>
          {[
            { key: "details", label: "📋 Details" },
            { key: "output",  label: "▶ Live Output" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                ...styles.tabBtn,
                background: activeTab === t.key ? exp.color : "rgba(255,255,255,0.07)",
                color: activeTab === t.key ? "#fff" : "#a0a0c0",
                border: activeTab === t.key ? "none" : "1px solid rgba(255,255,255,0.1)",
                fontWeight: activeTab === t.key ? 700 : 400,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── DETAILS TAB ── */}
        {activeTab === "details" && (
          <>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🎯 Objective</h3>
              <p style={styles.objectiveText}>{exp.objective}</p>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📋 Tasks</h3>
              <ul style={styles.taskList}>
                {exp.tasks.map((task, i) => (
                  <li key={i} style={styles.taskItem}>
                    <span style={{ ...styles.taskNum, background: exp.color }}>{i + 1}</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>💡 Key Concepts</h3>
              <div style={styles.conceptsGrid}>
                {exp.concepts.map((c, i) => (
                  <span key={i} style={styles.conceptChip}>{c}</span>
                ))}
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📁 Source Files</h3>
              <div style={styles.conceptsGrid}>
                {exp.files.map((f, i) => (
                  <span key={i} style={styles.fileChip}>{f}</span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── OUTPUT TAB ── */}
        {activeTab === "output" && (
          <div style={{ ...styles.section, background: "#fff", borderRadius: 14, padding: 24, color: "#111" }}>
            <h3 style={{ ...styles.sectionTitle, color: "#333" }}>▶ Live Output — Experiment {id}</h3>
            <Suspense fallback={
              <div style={{ textAlign: "center", padding: 40, color: "#999" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>⏳</div>
                Loading output...
              </div>
            }>
              {OutputComponent ? <OutputComponent /> : <p style={{ color: "#888" }}>No output available for this experiment.</p>}
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
