import React, { useState } from 'react';

/* ── Greeting ── */
const Greeting = ({ name = 'Guest', message = 'Welcome to React!' }) => (
  <div style={{ padding: 20, background: '#e7f3ff', borderRadius: 8 }}>
    <h3 style={{ marginTop: 0 }}>Greeting Component</h3>
    <p>Hello, <strong>{name}</strong>!</p>
    <p style={{ fontStyle: 'italic', color: '#555' }}>{message}</p>
  </div>
);

/* ── UserCard ── */
const UserCard = () => {
  const users = [
    { name: 'John Doe',      email: 'john@example.com',  age: 25 },
    { name: 'Priya Sharma',  email: 'priya@example.com', age: 22 },
    { name: 'Alex Turner',   email: 'alex@example.com',  age: 29 },
  ];
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>User Cards</h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {users.map((u, i) => (
          <div key={i} style={{ border: '2px solid #007bff', borderRadius: 10, padding: 18, minWidth: 180, textAlign: 'center', background: '#f0f8ff' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#007bff', color: '#fff', fontSize: 20, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>{u.name[0]}</div>
            <h4 style={{ margin: '0 0 4px' }}>{u.name}</h4>
            <p style={{ margin: '2px 0', fontSize: 13, color: '#555' }}>{u.email}</p>
            <p style={{ margin: '2px 0', fontSize: 13 }}>Age: {u.age}</p>
            <button style={{ marginTop: 8, padding: '6px 14px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Counter ── */
const Counter = ({ initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState(initialValue);
  const btn = (bg, fn, label) => (
    <button onClick={fn} style={{ padding: '10px 18px', background: bg, color: bg === '#ffc107' ? '#000' : '#fff', border: 'none', borderRadius: 5, cursor: 'pointer', fontWeight: 600 }}>{label}</button>
  );
  return (
    <div style={{ border: '2px solid #28a745', borderRadius: 10, padding: 24, textAlign: 'center', background: '#f0fdf4' }}>
      <h3 style={{ marginTop: 0 }}>Counter Component</h3>
      <div style={{ fontSize: 56, fontWeight: 700, color: '#28a745', fontFamily: 'monospace', margin: '16px 0' }}>{count}</div>
      <p style={{ color: '#666', margin: '0 0 16px' }}>Step Size: {step}</p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        {btn('#dc3545', () => setCount(c => c - step), '− Decrement')}
        {btn('#ffc107', () => setCount(initialValue), 'Reset')}
        {btn('#28a745', () => setCount(c => c + step), '+ Increment')}
      </div>
    </div>
  );
};

/* ── Toggle ── */
const Toggle = () => {
  const [on, setOn] = useState(false);
  return (
    <div style={{ border: '2px solid #ffc107', borderRadius: 10, padding: 24, textAlign: 'center', background: '#fffbf0' }}>
      <h3 style={{ marginTop: 0 }}>Toggle Switch</h3>
      <div
        onClick={() => setOn(!on)}
        style={{ width: 72, height: 36, background: on ? '#28a745' : '#dc3545', borderRadius: 18, cursor: 'pointer', position: 'relative', margin: '0 auto 14px', transition: 'background 0.3s' }}
      >
        <div style={{ width: 30, height: 30, background: '#fff', borderRadius: '50%', position: 'absolute', top: 3, left: on ? 38 : 3, transition: 'left 0.3s' }} />
      </div>
      <p style={{ fontSize: 22, fontWeight: 700, color: on ? '#28a745' : '#dc3545', margin: '0 0 14px' }}>{on ? 'ON' : 'OFF'}</p>
      <button onClick={() => setOn(!on)} style={{ padding: '10px 22px', background: '#ffc107', color: '#000', border: 'none', borderRadius: 5, cursor: 'pointer', fontWeight: 700 }}>Toggle State</button>
    </div>
  );
};

/* ── Demo greeting controls ── */
function GreetingDemo() {
  const [name, setName] = useState('Guest');
  const [msg, setMsg] = useState('Welcome to React!');
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" style={{ padding: '7px 12px', border: '1px solid #ccc', borderRadius: 5, fontSize: 13 }} />
        <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Message" style={{ padding: '7px 12px', border: '1px solid #ccc', borderRadius: 5, fontSize: 13, flex: 1 }} />
      </div>
      <Greeting name={name} message={msg} />
    </div>
  );
}

/* ── Tab Controller ── */
const tabs = ['Greeting', 'User Cards', 'Counter', 'Toggle'];

export default function Exp2Output() {
  const [tab, setTab] = useState(0);
  const content = [<GreetingDemo />, <UserCard />, <Counter initialValue={0} step={1} />, <Toggle />];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{ padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: tab === i ? 700 : 400, background: tab === i ? '#28a745' : '#e9ecef', color: tab === i ? '#fff' : '#333', fontSize: 13 }}>{t}</button>
        ))}
      </div>
      {content[tab]}
    </div>
  );
}
