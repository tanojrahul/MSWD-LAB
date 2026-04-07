import React, { useState, useEffect, useRef } from 'react';

/* ── Shared Terminal Component ── */
function Terminal({ lines }) {
  const endRef = useRef(null);
  const [shown, setShown] = useState(0);
  useEffect(() => { setShown(0); }, [lines]);
  useEffect(() => {
    if (shown < lines.length) {
      const t = setTimeout(() => setShown(n => n + 1), lines[shown]?.delay ?? 60);
      return () => clearTimeout(t);
    }
  }, [shown, lines]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [shown]);

  return (
    <div style={{ background: '#0d1117', borderRadius: 8, fontFamily: "'Consolas','Courier New',monospace", fontSize: 13, padding: '16px 18px', minHeight: 200, maxHeight: 420, overflowY: 'auto', lineHeight: 1.6 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
      </div>
      {lines.slice(0, shown).map((l, i) => (
        <div key={i} style={{ color: l.color ?? '#c9d1d9', marginBottom: l.gap ? 6 : 0 }}>
          {l.prompt && <span style={{ color: '#58a6ff' }}>{l.prompt} </span>}
          <span style={{ color: l.color ?? '#c9d1d9' }}>{l.text}</span>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}

function InfoBadge({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#161b22', borderRadius: 6, padding: '6px 12px', fontSize: 12 }}>
      <span style={{ color: '#8b949e' }}>{label}:</span>
      <span style={{ color: '#58a6ff', fontWeight: 600 }}>{value}</span>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* Exp 7 – MongoDB Design */
export const Exp7Output = () => {
  const lines = [
    { text: '// Travel Agency Schema', color: '#6e7681' },
    { text: 'db.createCollection("customers")', prompt: '>' },
    { text: '{ ok: 1 }', color: '#3fb950', gap: true },
    { text: 'db.customers.insertOne({ name: "Alice", email: "alice@mail.com", phone: "9876543210" })', prompt: '>' },
    { text: '{ acknowledged: true, insertedId: ObjectId("648f...") }', color: '#3fb950', gap: true },
    { text: '// Event Platform Schema', color: '#6e7681' },
    { text: 'db.createCollection("events")', prompt: '>' },
    { text: '{ ok: 1 }', color: '#3fb950', gap: true },
    { text: 'db.events.insertOne({ title: "Tech Summit", date: "2026-05-01", capacity: 200 })', prompt: '>' },
    { text: '{ acknowledged: true, insertedId: ObjectId("649a...") }', color: '#3fb950', gap: true },
    { text: '// Aggregation – count bookings per customer', color: '#6e7681' },
    { text: 'db.bookings.aggregate([{ $group: { _id: "$customerId", total: { $sum: 1 } } }])', prompt: '>' },
    { text: '[{ _id: ObjectId("648f..."), total: 3 }, { _id: ObjectId("648e..."), total: 1 }]', color: '#e3b341' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <InfoBadge label="DB" value="MongoDB" />
        <InfoBadge label="Collections" value="customers, bookings, events, payments" />
        <InfoBadge label="Pattern" value="Referenced Documents" />
      </div>
      <Terminal lines={lines} />
    </div>
  );
};

/* Exp 8 – MongoDB CRUD */
export const Exp8Output = () => {
  const lines = [
    { text: 'use EvaluationBoard', prompt: '>' },
    { text: 'switched to db EvaluationBoard', color: '#3fb950', gap: true },
    { text: 'db.students.insertMany([{ name:"Amit", score:85 }, { name:"Neha", score:92 }])', prompt: '>' },
    { text: '{ acknowledged: true, insertedCount: 2 }', color: '#3fb950', gap: true },
    { text: 'db.students.find({ score: { $gt: 80 } }, { name:1, score:1 })', prompt: '>' },
    { text: '[{ name: "Amit", score: 85 }, { name: "Neha", score: 92 }]', color: '#e3b341', gap: true },
    { text: 'db.students.updateOne({ name:"Amit" }, { $set: { score:90 }, $inc: { attempts:1 } })', prompt: '>' },
    { text: '{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }', color: '#3fb950', gap: true },
    { text: 'db.students.deleteOne({ score: { $lt: 50 } })', prompt: '>' },
    { text: '{ acknowledged: true, deletedCount: 0 }', color: '#3fb950', gap: true },
    { text: 'db.students.aggregate([{ $group: { _id: null, avgScore: { $avg: "$score" } } }])', prompt: '>' },
    { text: '[{ _id: null, avgScore: 91 }]', color: '#e3b341' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <InfoBadge label="DB" value="EvaluationBoard" />
        <InfoBadge label="Operations" value="insertMany, find, updateOne, deleteOne, aggregate" />
      </div>
      <Terminal lines={lines} />
    </div>
  );
};

/* Exp 9 – MongoDB Atlas */
export const Exp9Output = () => {
  const lines = [
    { text: "const { MongoClient } = require('mongodb');", color: '#79c0ff' },
    { text: "const uri = process.env.MONGO_URI; // Atlas connection string", color: '#6e7681' },
    { text: "const client = new MongoClient(uri);", color: '#c9d1d9' },
    { text: 'Connecting to MongoDB Atlas...', color: '#8b949e', gap: true },
    { text: '✅ Connected to Atlas cluster!', color: '#3fb950', gap: true },
    { text: "db.collection('products').find().sort({ price: -1 }).limit(3)", prompt: '>' },
    { text: '[{ name:"Laptop", price:1200 }, { name:"Phone", price:800 }, { name:"Watch", price:350 }]', color: '#e3b341', gap: true },
    { text: "db.collection('products').aggregate([{ $match: { price: { $gt: 500 } } }, { $group: { _id: '$category', count: { $sum: 1 } } }])", prompt: '>' },
    { text: '[{ _id: "Electronics", count: 2 }]', color: '#e3b341', gap: true },
    { text: 'Connection closed.', color: '#8b949e' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <InfoBadge label="Service" value="MongoDB Atlas (Cloud)" />
        <InfoBadge label="Driver" value="Node.js MongoClient" />
        <InfoBadge label="Port" value="27017 (SRV)" />
      </div>
      <Terminal lines={lines} />
    </div>
  );
};

/* Exp 10 – Express Basics */
export const Exp10Output = () => {
  const lines = [
    { text: "const express = require('express');", color: '#79c0ff' },
    { text: 'const app = express();', color: '#c9d1d9' },
    { text: 'app.listen(3001);', color: '#c9d1d9', gap: true },
    { text: 'Server running on http://localhost:3001', color: '#3fb950', gap: true },
    { text: 'GET    /products         -> 200 [array of 5 products]', color: '#58a6ff', prompt: '📡' },
    { text: 'GET    /products/1       -> 200 { id:1, name:"Laptop", price:999 }', color: '#58a6ff', prompt: '📡' },
    { text: 'GET    /products?category=electronics -> 200 [2 products]', color: '#58a6ff', prompt: '📡' },
    { text: 'POST   /products         -> 201 { id:6, name:"Monitor", price:300 }', color: '#3fb950', prompt: '📡' },
    { text: 'PUT    /products/2       -> 200 { id:2, name:"Phone", price:850 }', color: '#e3b341', prompt: '📡' },
    { text: 'DELETE /products/3       -> 200 { message: "Deleted successfully" }', color: '#f85149', prompt: '📡' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <InfoBadge label="Framework" value="Express.js" />
        <InfoBadge label="Port" value="3001" />
        <InfoBadge label="Resource" value="/products" />
      </div>
      <Terminal lines={lines} />
    </div>
  );
};

/* Exp 11 – Express Router */
export const Exp11Output = () => {
  const lines = [
    { text: "app.use('/users',    usersRouter);", color: '#79c0ff' },
    { text: "app.use('/posts',    postsRouter);", color: '#79c0ff' },
    { text: "app.use('/comments', commentsRouter);", color: '#79c0ff', gap: true },
    { text: 'Server running on http://localhost:3002', color: '#3fb950', gap: true },
    { text: 'GET  /users           -> 200 [{ id:1, name:"Alice" }, ...]', color: '#58a6ff', prompt: '📡' },
    { text: 'POST /users           -> 201 { id:3, name:"Charlie" }', color: '#3fb950', prompt: '📡' },
    { text: 'GET  /posts           -> 200 [{ id:1, title:"Hello World" }, ...]', color: '#58a6ff', prompt: '📡' },
    { text: 'GET  /posts/1         -> 200 { id:1, title:"Hello World", content:"..." }', color: '#58a6ff', prompt: '📡' },
    { text: 'GET  /comments?postId=1 -> 200 [{ id:1, text:"Great post!" }]', color: '#58a6ff', prompt: '📡' },
    { text: 'DELETE /comments/2    -> 200 { message: "Comment removed" }', color: '#f85149', prompt: '📡' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <InfoBadge label="Pattern" value="Modular Routing" />
        <InfoBadge label="Port" value="3002" />
        <InfoBadge label="Routers" value="Users, Posts, Comments" />
      </div>
      <Terminal lines={lines} />
    </div>
  );
};

/* Exp 12 – JWT Auth */
export const Exp12Output = () => {
  const lines = [
    { text: 'POST /login  { email:"admin@test.com", password:"1234" }', color: '#e3b341', prompt: '📡' },
    { text: '-> 200 { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJpYXQiOjE3MTI0ODAwMDB9.abc123" }', color: '#3fb950', gap: true },
    { text: 'GET /dashboard  (no token)', color: '#e3b341', prompt: '📡' },
    { text: '-> 401 { error: "Access denied. No token provided." }', color: '#f85149', gap: true },
    { text: 'GET /dashboard  Authorization: Bearer eyJhbGci...', color: '#e3b341', prompt: '📡' },
    { text: '-> 200 { message: "Welcome admin@test.com", data: { userId:1, role:"admin" } }', color: '#3fb950', gap: true },
    { text: 'GET /dashboard  Authorization: Bearer invalid_token', color: '#e3b341', prompt: '📡' },
    { text: '-> 403 { error: "Invalid token." }', color: '#f85149' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <InfoBadge label="Library" value="jsonwebtoken" />
        <InfoBadge label="Port" value="3003" />
        <InfoBadge label="Algorithm" value="HS256" />
      </div>
      <Terminal lines={lines} />
    </div>
  );
};

/* Exp 13 – JWT Expiry */
export const Exp13Output = () => {
  const lines = [
    { text: 'POST /login  -> access token (15 min) + refresh token (7 days)', color: '#3fb950', prompt: '📡' },
    { text: '{ accessToken: "eyJ...", refreshToken: "eyJ..." }', color: '#e3b341', gap: true },
    { text: '... 16 minutes later ...', color: '#6e7681', gap: true },
    { text: 'GET /protected  Authorization: Bearer <expired_access_token>', color: '#e3b341', prompt: '📡' },
    { text: '-> 401 { error: "TokenExpiredError: jwt expired" }', color: '#f85149', gap: true },
    { text: 'POST /refresh  { refreshToken: "eyJ..." }', color: '#e3b341', prompt: '📡' },
    { text: '-> 200 { accessToken: "eyJ...(new)" }', color: '#3fb950', gap: true },
    { text: 'POST /logout  { refreshToken: "eyJ..." }', color: '#e3b341', prompt: '📡' },
    { text: '-> 200 { message: "Logged out. Refresh token revoked." }', color: '#3fb950' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <InfoBadge label="Access Token TTL" value="15 minutes" />
        <InfoBadge label="Refresh Token TTL" value="7 days" />
        <InfoBadge label="Port" value="3004" />
      </div>
      <Terminal lines={lines} />
    </div>
  );
};

/* Exp 14 – Role-Based Auth */
export const Exp14Output = () => {
  const lines = [
    { text: 'POST /login { email:"user@test.com", role:"user" }', color: '#e3b341', prompt: '📡' },
    { text: '-> 200 { token: "eyJ...", role: "user" }', color: '#3fb950', gap: true },
    { text: 'GET /admin-only  (role: user)', color: '#e3b341', prompt: '📡' },
    { text: '-> 403 { error: "Access denied. Admins only." }', color: '#f85149', gap: true },
    { text: 'POST /login { email:"admin@test.com", role:"admin" }', color: '#e3b341', prompt: '📡' },
    { text: '-> 200 { token: "eyJ...", role: "admin" }', color: '#3fb950', gap: true },
    { text: 'GET /admin-only  (role: admin)', color: '#e3b341', prompt: '📡' },
    { text: '-> 200 { message: "Admin dashboard", users: [...] }', color: '#3fb950', gap: true },
    { text: 'GET /moderator-panel  (role: moderator)', color: '#e3b341', prompt: '📡' },
    { text: '-> 200 { message: "Moderator tools available" }', color: '#3fb950' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <InfoBadge label="Roles" value="admin, user, moderator" />
        <InfoBadge label="Port" value="3005" />
        <InfoBadge label="Pattern" value="RBAC Middleware" />
      </div>
      <Terminal lines={lines} />
    </div>
  );
};

/* Exp 15 – File Operations */
export const Exp15Output = () => {
  const lines = [
    { text: 'POST /files  { filename:"notes.txt", content:"Hello World!" }', color: '#e3b341', prompt: '📡' },
    { text: '-> 201 { message: "File created: notes.txt" }', color: '#3fb950', gap: true },
    { text: 'GET  /files/notes.txt', color: '#e3b341', prompt: '📡' },
    { text: '-> 200 { content: "Hello World!" }', color: '#58a6ff', gap: true },
    { text: 'PUT  /files/notes.txt  { content:"Updated content" }', color: '#e3b341', prompt: '📡' },
    { text: '-> 200 { message: "File updated: notes.txt" }', color: '#3fb950', gap: true },
    { text: 'DELETE /files/notes.txt', color: '#e3b341', prompt: '📡' },
    { text: '-> 200 { message: "File deleted: notes.txt" }', color: '#f85149', gap: true },
    { text: 'GET  /files/notes.txt  (after delete)', color: '#e3b341', prompt: '📡' },
    { text: '-> 404 { error: "File not found" }', color: '#f85149' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <InfoBadge label="Module" value="Node.js fs.promises" />
        <InfoBadge label="Port" value="3006" />
        <InfoBadge label="Operations" value="Create, Read, Update, Delete" />
      </div>
      <Terminal lines={lines} />
    </div>
  );
};

/* Exp 16 – Full Stack Auth */
export const Exp16Output = () => {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const handleLogin = () => {
    if (email && password) {
      const fakeToken = 'eyJhbGciOiJIUzI1NiJ9.' + btoa(JSON.stringify({ email, exp: Date.now() + 86400000 })) + '.signature';
      setToken(fakeToken);
      setLoggedIn(true);
    }
  };

  if (loggedIn) {
    return (
      <div>
        <div style={{ background: '#0d1117', borderRadius: 8, padding: 14, fontFamily: 'monospace', fontSize: 12, marginBottom: 14 }}>
          <div style={{ color: '#8b949e', marginBottom: 6 }}>// Token stored in localStorage</div>
          <div style={{ color: '#3fb950', wordBreak: 'break-all' }}>JWT: {token.substring(0, 60)}...</div>
        </div>
        <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', borderRadius: 8, padding: 20 }}>
          <h3 style={{ margin: '0 0 8px', color: '#155724' }}>🔒 Protected Dashboard</h3>
          <p style={{ margin: '0 0 8px', color: '#155724' }}>✅ Logged in as <strong>{email}</strong></p>
          <p style={{ margin: '0 0 14px', color: '#155724' }}>Token verified. Protected content is accessible.</p>
          <button onClick={() => { setLoggedIn(false); setToken(''); setEmail(''); setPassword(''); }} style={{ padding: '8px 16px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' }}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['login','register'].map(v => (
          <button key={v} onClick={() => setView(v)} style={{ padding: '7px 18px', borderRadius: 20, border: 'none', cursor: 'pointer', background: view === v ? '#CE93D8' : '#e9ecef', color: view === v ? '#fff' : '#333', fontWeight: view === v ? 700 : 400, textTransform: 'capitalize' }}>{v}</button>
        ))}
      </div>
      <div style={{ maxWidth: 360, border: '2px solid #CE93D8', borderRadius: 10, padding: 24, background: '#fdf4ff' }}>
        <h3 style={{ marginTop: 0, color: '#7b1fa2' }}>{view === 'login' ? '🔐 Login' : '📝 Register'}</h3>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" style={{ width: '100%', padding: '9px 12px', marginBottom: 12, border: '1px solid #ccc', borderRadius: 5, boxSizing: 'border-box', fontSize: 13 }} />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" style={{ width: '100%', padding: '9px 12px', marginBottom: 14, border: '1px solid #ccc', borderRadius: 5, boxSizing: 'border-box', fontSize: 13 }} />
        <button onClick={handleLogin} style={{ width: '100%', padding: 11, background: '#7b1fa2', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer', fontWeight: 700, fontSize: 15 }}>
          {view === 'login' ? 'Login & Get Token' : 'Register'}
        </button>
        <p style={{ fontSize: 11, color: '#888', textAlign: 'center', marginBottom: 0, marginTop: 10 }}>Backend: Express on Port 3007 · CORS enabled</p>
      </div>
    </div>
  );
};

/* Exp 17 – GraphQL */
export const Exp17Output = () => {
  const [query, setQuery] = useState('query {\n  students {\n    id\n    name\n    course {\n      title\n    }\n  }\n}');
  const results = {
    'students': `{\n  "data": {\n    "students": [\n      { "id": "1", "name": "Amit", "course": { "title": "React Basics" } },\n      { "id": "2", "name": "Neha", "course": { "title": "Node.js" } }\n    ]\n  }\n}`,
    'courses': `{\n  "data": {\n    "courses": [\n      { "id": "1", "title": "React Basics", "instructor": "John" },\n      { "id": "2", "title": "Node.js", "instructor": "Jane" }\n    ]\n  }\n}`,
  };
  const getResult = () => {
    if (query.includes('students')) return results['students'];
    if (query.includes('courses')) return results['courses'];
    return '{ "errors": [{ "message": "Unknown query" }] }';
  };
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <InfoBadge label="Server" value="Apollo Server" />
        <InfoBadge label="Port" value="4000/graphql" />
        <InfoBadge label="Types" value="Student, Course" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <p style={{ fontFamily: 'monospace', fontSize: 12, color: '#8b949e', margin: '0 0 6px' }}>GraphQL Query:</p>
          <textarea value={query} onChange={e => setQuery(e.target.value)} style={{ width: '100%', height: 160, background: '#0d1117', color: '#c9d1d9', border: '1px solid #30363d', borderRadius: 6, padding: 10, fontFamily: 'monospace', fontSize: 12, boxSizing: 'border-box', resize: 'vertical' }} />
        </div>
        <div>
          <p style={{ fontFamily: 'monospace', fontSize: 12, color: '#8b949e', margin: '0 0 6px' }}>Response:</p>
          <pre style={{ background: '#0d1117', color: '#3fb950', border: '1px solid #30363d', borderRadius: 6, padding: 10, fontFamily: 'monospace', fontSize: 12, margin: 0, height: 160, overflowY: 'auto' }}>{getResult()}</pre>
        </div>
      </div>
      <p style={{ fontSize: 12, color: '#888', marginBottom: 0, marginTop: 8 }}>Try editing the query above — type "students" or "courses"</p>
    </div>
  );
};

/* Exp 18 – TypeScript */
export const Exp18Output = () => {
  const lines = [
    { text: '// TypeScript Interface Definitions', color: '#6e7681' },
    { text: 'interface User    { id: number; name: string; email: string; }', color: '#79c0ff' },
    { text: 'interface Post    { id: number; title: string; body: string; userId: number; }', color: '#79c0ff', gap: true },
    { text: '// Typed Component Props', color: '#6e7681' },
    { text: 'const UserProfile: React.FC<{ user: User }> = ({ user }) => { ... };', color: '#c9d1d9' },
    { text: 'const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => { ... };', color: '#c9d1d9', gap: true },
    { text: '// Type Error at compile time ✅', color: '#6e7681' },
    { text: '<UserProfile user={{ id: 1, name: "Amit", email: "amit@test.com" }} />', color: '#3fb950' },
    { text: '<UserProfile user={{ id: "1", name: "Amit" }} />', color: '#c9d1d9' },
    { text: "// TS Error: Type 'string' is not assignable to type 'number'", color: '#f85149', gap: true },
    { text: 'npx tsc --noEmit', color: '#e3b341', prompt: '$' },
    { text: 'Compilation complete with 0 errors.', color: '#3fb950' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <InfoBadge label="Language" value="TypeScript 5.x" />
        <InfoBadge label="Framework" value="React + TSX" />
        <InfoBadge label="Checker" value="strict mode" />
      </div>
      <Terminal lines={lines} />
    </div>
  );
};

/* Exp 19 – Testing */
export const Exp19Output = () => {
  const lines = [
    { text: 'npx jest --coverage', color: '#e3b341', prompt: '$' },
    { text: '', gap: true },
    { text: 'PASS  src/tests/Counter.test.js', color: '#3fb950' },
    { text: '  ✓ renders Counter with initial value 0 (12ms)', color: '#3fb950' },
    { text: '  ✓ increments count on button click (8ms)', color: '#3fb950' },
    { text: '  ✓ decrements count on button click (5ms)', color: '#3fb950' },
    { text: '  ✓ resets count to initial value (4ms)', color: '#3fb950', gap: true },
    { text: 'PASS  src/tests/api.test.js', color: '#3fb950' },
    { text: '  ✓ GET /products returns 200 (45ms)', color: '#3fb950' },
    { text: '  ✓ POST /products creates new product (32ms)', color: '#3fb950' },
    { text: '  ✓ DELETE /products/1 removes product (28ms)', color: '#3fb950', gap: true },
    { text: 'Test Suites: 2 passed, 2 total', color: '#e3b341' },
    { text: 'Tests:       7 passed, 7 total', color: '#e3b341' },
    { text: 'Coverage:    Statements: 92.3% | Branches: 87.5%', color: '#58a6ff' },
    { text: '', gap: true },
    { text: 'All tests passed! ✅', color: '#3fb950' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <InfoBadge label="Framework" value="Jest + React Testing Library" />
        <InfoBadge label="Coverage" value="92.3%" />
        <InfoBadge label="Tests" value="7 passed" />
      </div>
      <Terminal lines={lines} />
    </div>
  );
};

/* Exp 20 – Cloud Deployment */
export const Exp20Output = () => {
  const lines = [
    { text: 'docker build -t mswd-app .', color: '#e3b341', prompt: '$' },
    { text: 'Successfully built 3f4a8c2d1e9b', color: '#3fb950', gap: true },
    { text: 'docker-compose up -d', color: '#e3b341', prompt: '$' },
    { text: '[+] Running 2/2', color: '#3fb950' },
    { text: ' ✔ Container mswd-frontend   Started', color: '#3fb950' },
    { text: ' ✔ Container mswd-backend    Started', color: '#3fb950', gap: true },
    { text: 'az webapp create --name mswd-lab --runtime "NODE:18-lts"', color: '#e3b341', prompt: '$' },
    { text: 'App created: https://mswd-lab.azurewebsites.net', color: '#3fb950', gap: true },
    { text: 'az webapp config appsettings set --settings MONGO_URI=$MONGO_URI JWT_SECRET=$JWT_SECRET', color: '#e3b341', prompt: '$' },
    { text: 'Environment variables configured.', color: '#3fb950', gap: true },
    { text: 'GitHub Actions CI/CD pipeline triggered...', color: '#8b949e' },
    { text: '✅ Build passed · ✅ Tests passed · ✅ Deployed to Azure', color: '#3fb950' },
    { text: 'Live at: https://mswd-lab.azurewebsites.net', color: '#58a6ff' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <InfoBadge label="Cloud" value="Azure App Service" />
        <InfoBadge label="Container" value="Docker + Compose" />
        <InfoBadge label="CI/CD" value="GitHub Actions" />
      </div>
      <Terminal lines={lines} />
    </div>
  );
};
