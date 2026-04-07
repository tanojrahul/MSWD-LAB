import React from "react";
import { Link } from "react-router-dom";

const experiments = [
  {
    id: 1,
    title: "React Components",
    category: "Frontend",
    color: "#4FC3F7",
    description: "State management, hooks, events, and reusable components.",
  },
  {
    id: 2,
    title: "Hooks & State",
    category: "Frontend",
    color: "#4FC3F7",
    description: "Functional components with useState, default props, and interactive patterns.",
  },
  {
    id: 3,
    title: "React Router",
    category: "Frontend",
    color: "#4FC3F7",
    description: "Client-side routing, nested routes, and URL parameters.",
  },
  {
    id: 4,
    title: "Material-UI",
    category: "Frontend",
    color: "#4FC3F7",
    description: "Enterprise UI components, theming, and responsive design.",
  },
  {
    id: 5,
    title: "Bootstrap",
    category: "Frontend",
    color: "#4FC3F7",
    description: "CSS framework, responsive grid, and utility classes.",
  },
  {
    id: 6,
    title: "Axios & API",
    category: "Frontend",
    color: "#4FC3F7",
    description: "HTTP requests, error handling, and third-party API consumption.",
  },
  {
    id: 7,
    title: "MongoDB Design",
    category: "Database",
    color: "#81C784",
    description: "Schema modeling, relationships, and collection design.",
  },
  {
    id: 8,
    title: "MongoDB CRUD",
    category: "Database",
    color: "#81C784",
    description: "Create, Read, Update, Delete, and aggregation operations.",
  },
  {
    id: 9,
    title: "MongoDB Atlas",
    category: "Database",
    color: "#81C784",
    description: "Cloud database, Node.js driver, sorting, and filtering.",
  },
  {
    id: 10,
    title: "Express Basics",
    category: "Backend",
    color: "#FFB74D",
    description: "GET, POST, PUT, DELETE routes with Express.js.",
  },
  {
    id: 11,
    title: "Express Router",
    category: "Backend",
    color: "#FFB74D",
    description: "Modular routing with separate Router instances for multiple resources.",
  },
  {
    id: 12,
    title: "JWT Auth",
    category: "Backend",
    color: "#FFB74D",
    description: "Token generation, protected routes, and middleware verification.",
  },
  {
    id: 13,
    title: "JWT Expiry",
    category: "Backend",
    color: "#FFB74D",
    description: "Access/refresh tokens, token expiration, and revocation.",
  },
  {
    id: 14,
    title: "Role-Based Auth",
    category: "Backend",
    color: "#FFB74D",
    description: "User roles (admin, user, moderator) and access control.",
  },
  {
    id: 15,
    title: "File Operations",
    category: "Backend",
    color: "#FFB74D",
    description: "Create, read, update, and delete files with Node.js fs module.",
  },
  {
    id: 16,
    title: "Full Stack Auth",
    category: "Advanced",
    color: "#CE93D8",
    description: "React frontend + Express backend with JWT authentication.",
  },
  {
    id: 17,
    title: "GraphQL",
    category: "Advanced",
    color: "#CE93D8",
    description: "Queries, mutations, schema definition, and Apollo Server.",
  },
  {
    id: 18,
    title: "TypeScript",
    category: "Advanced",
    color: "#CE93D8",
    description: "Typed components, interfaces, and type-safe React development.",
  },
  {
    id: 19,
    title: "Testing",
    category: "Advanced",
    color: "#CE93D8",
    description: "Unit tests, integration tests, and API testing with Jest.",
  },
  {
    id: 20,
    title: "Cloud Deployment",
    category: "Advanced",
    color: "#CE93D8",
    description: "Docker, CI/CD, and Azure deployment for full-stack apps.",
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    color: "#fff",
    margin: 0,
  },
  subtitle: {
    fontSize: 16,
    color: "#b0b0d0",
    marginTop: 8,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 24,
    maxWidth: 1200,
    margin: "0 auto",
  },
  card: {
    background: "rgba(255,255,255,0.07)",
    backdropFilter: "blur(10px)",
    borderRadius: 16,
    padding: 24,
    textDecoration: "none",
    color: "#fff",
    transition: "transform 0.2s, box-shadow 0.2s",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    display: "block",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  expNum: {
    fontSize: 14,
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: 20,
    color: "#fff",
  },
  badge: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.15)",
    color: "#ccc",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 600,
    margin: "8px 0",
  },
  cardDesc: {
    fontSize: 14,
    color: "#a0a0c0",
    lineHeight: 1.5,
    margin: 0,
  },
  arrow: {
    marginTop: 16,
    fontSize: 13,
    color: "#8080b0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
  viewBtn: {
    fontSize: 12,
    padding: "4px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
    color: "#ccc",
    cursor: "pointer",
  },
};

export default function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>MSWD Lab Experiments</h1>
        <p style={styles.subtitle}>
          Modern Software Web Development — 20 Hands-on Experiments
        </p>
      </div>
      <div style={styles.grid}>
        {experiments.map((exp) => (
          <Link
            to={`/exp/${exp.id}`}
            key={exp.id}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = `0 8px 30px ${exp.color}33`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={styles.cardTop}>
              <span style={{ ...styles.expNum, background: exp.color }}>
                Exp {exp.id}
              </span>
              <span style={styles.badge}>{exp.category}</span>
            </div>
            <h2 style={styles.cardTitle}>{exp.title}</h2>
            <p style={styles.cardDesc}>{exp.description}</p>
            <div style={styles.arrow}>
              <span>View Details →</span>
              <span style={styles.viewBtn}>▶ Live Output</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
