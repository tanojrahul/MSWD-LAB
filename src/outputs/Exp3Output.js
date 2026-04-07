import React, { useState } from 'react';

/* ── Pages ── */
const HomePage = () => (
  <div style={{ padding: 24, background: '#e7f3ff', borderRadius: 8 }}>
    <h2 style={{ marginTop: 0 }}>🏠 Home Page</h2>
    <p>Welcome to the React Router Experiment Application!</p>
    <ul>
      <li>Basic routing with React Router</li>
      <li>Nested routing structures</li>
      <li>Dynamic routes with URL parameters</li>
    </ul>
  </div>
);

const FriendsPage = () => {
  const friends = [
    { id: 1, name: 'Alice Johnson', status: 'Online' },
    { id: 2, name: 'Bob Smith',     status: 'Away'   },
    { id: 3, name: 'Charlie Brown', status: 'Online' },
    { id: 4, name: 'Diana Evans',   status: 'Offline'},
  ];
  const colors = { Online: '#28a745', Away: '#ffc107', Offline: '#6c757d' };
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>👥 Friends List</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
        {friends.map(f => (
          <div key={f.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 14, background: '#fafafa' }}>
            <h4 style={{ margin: '0 0 8px' }}>{f.name}</h4>
            <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 12, background: colors[f.status], color: f.status === 'Away' ? '#000' : '#fff' }}>{f.status}</span>
            <br />
            <button style={{ marginTop: 10, padding: '6px 12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PostsPage = () => {
  const posts = [
    { id: 1, author: 'Alice', title: 'React Router Tutorial',    likes: 45 },
    { id: 2, author: 'Bob',   title: 'JavaScript ES6 Features',  likes: 32 },
    { id: 3, author: 'Charlie', title: 'Web Development Tips',   likes: 78 },
  ];
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>📰 Posts Feed</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {posts.map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, background: '#fafafa' }}>
            <h4 style={{ margin: '0 0 4px' }}>{p.title}</h4>
            <p style={{ margin: '0 0 10px', color: '#666', fontSize: 13 }}>By <strong>{p.author}</strong></p>
            <button style={{ padding: '6px 14px', background: '#28a745', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13, marginRight: 8 }}>👍 Like ({p.likes})</button>
            <button style={{ padding: '6px 14px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>💬 Comment</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alice', text: "Hey, how are you?",  time: '10:30 AM' },
    { id: 2, sender: 'You',   text: 'I am doing great!',  time: '10:31 AM' },
    { id: 3, sender: 'Alice', text: "That's awesome!",    time: '10:32 AM' },
  ]);
  const [input, setInput] = useState('');
  const send = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'You', text: input, time: new Date().toLocaleTimeString() }]);
      setInput('');
    }
  };
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>💬 Chat</h2>
      <div style={{ border: '1px solid #ddd', borderRadius: 8, height: 260, overflowY: 'auto', padding: 12, background: '#f9f9f9', marginBottom: 10 }}>
        {messages.map(m => (
          <div key={m.id} style={{ textAlign: m.sender === 'You' ? 'right' : 'left', marginBottom: 10 }}>
            <div style={{ display: 'inline-block', background: m.sender === 'You' ? '#007bff' : '#e9ecef', color: m.sender === 'You' ? '#fff' : '#000', padding: '8px 14px', borderRadius: 12, maxWidth: '70%' }}>
              <p style={{ margin: '0 0 3px', fontSize: 11, opacity: 0.7 }}>{m.sender} · {m.time}</p>
              <p style={{ margin: 0 }}>{m.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && send()} placeholder="Type a message..." style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }} />
        <button onClick={send} style={{ padding: '8px 18px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Send</button>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div style={{ maxWidth: 380, margin: '0 auto', border: '2px solid #007bff', borderRadius: 10, padding: 24, background: '#f0f8ff' }}>
      <h2 style={{ textAlign: 'center', marginTop: 0 }}>🔐 Login</h2>
      {loggedIn ? (
        <div style={{ background: '#d4edda', padding: 16, borderRadius: 6, color: '#155724', textAlign: 'center' }}>
          <p>✓ Logged in as <strong>{creds.email}</strong></p>
          <button onClick={() => { setLoggedIn(false); setCreds({ email: '', password: '' }); }} style={{ padding: '8px 18px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Logout</button>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); if (creds.email && creds.password) setLoggedIn(true); }}>
          {['email','password'].map(field => (
            <div key={field} style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 4, textTransform: 'capitalize' }}>{field}</label>
              <input type={field} value={creds[field]} onChange={e => setCreds({ ...creds, [field]: e.target.value })} style={{ width: '100%', padding: '9px 12px', border: '1px solid #ccc', borderRadius: 5, boxSizing: 'border-box', fontSize: 13 }} placeholder={field === 'email' ? 'you@email.com' : '••••••••'} />
            </div>
          ))}
          <button type="submit" style={{ width: '100%', padding: 12, background: '#007bff', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer', fontWeight: 700, fontSize: 15 }}>Login</button>
        </form>
      )}
    </div>
  );
};

const HospitalPage = () => {
  const [selected, setSelected] = useState(null);
  const hospitals = [
    { id: 1, name: 'City General Hospital', location: 'Downtown', departments: ['Emergency', 'Cardiology', 'Neurology'], beds: 500 },
    { id: 2, name: 'St. Mary Medical Center', location: 'Uptown', departments: ['Pediatrics', 'Orthopedics', 'Oncology'], beds: 350 },
    { id: 3, name: 'Health Plus Hospital', location: 'Midtown', departments: ['Surgery', 'Dentistry', 'Dermatology'], beds: 250 },
  ];
  if (selected) {
    const h = hospitals.find(x => x.id === selected);
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ padding: '6px 14px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', marginBottom: 14, fontSize: 13 }}>← Back</button>
        <h3 style={{ marginTop: 0 }}>{h.name}</h3>
        <p><strong>Total Beds:</strong> {h.beds}</p>
        <p><strong>Location:</strong> {h.location}</p>
        <h4>Departments:</h4>
        <ul>{h.departments.map(d => <li key={d}>{d}</li>)}</ul>
      </div>
    );
  }
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>🏥 Hospital Management</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        {hospitals.map(h => (
          <div key={h.id} onClick={() => setSelected(h.id)} style={{ padding: 14, border: '1px solid #ddd', borderRadius: 8, background: '#fafafa', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.background = '#e7f3ff'}
            onMouseLeave={e => e.currentTarget.style.background = '#fafafa'}>
            <h4 style={{ margin: '0 0 4px' }}>{h.name}</h4>
            <p style={{ margin: 0, color: '#666', fontSize: 13 }}>{h.location} · Click to view details →</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Tab Nav ── */
const tabs = ['Home', 'Friends', 'Posts', 'Chat', 'Login', 'Hospital'];
const pages = [<HomePage />, <FriendsPage />, <PostsPage />, <ChatPage />, <LoginPage />, <HospitalPage />];

export default function Exp3Output() {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <nav style={{ display: 'flex', gap: 4, background: '#343a40', padding: '10px 12px', borderRadius: '8px 8px 0 0', flexWrap: 'wrap' }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{ padding: '7px 16px', borderRadius: 5, border: 'none', cursor: 'pointer', fontWeight: tab === i ? 700 : 400, background: tab === i ? '#4FC3F7' : 'transparent', color: tab === i ? '#000' : '#ccc', fontSize: 13, transition: 'all 0.2s' }}>{t}</button>
        ))}
      </nav>
      <div style={{ border: '1px solid #ddd', borderRadius: '0 0 8px 8px', padding: 20, minHeight: 200, background: '#fff' }}>
        {pages[tab]}
      </div>
    </div>
  );
}
