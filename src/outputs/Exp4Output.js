import React, { useState } from 'react';

/* ── Simplified Material-UI style Train Reservation Form ── */
const stations = ['New Delhi', 'Mumbai Central', 'Bangalore', 'Hyderabad', 'Kolkata', 'Chennai'];

const inputStyle = {
  width: '100%', padding: '10px 12px', border: '1px solid #bbb', borderRadius: 4,
  fontSize: 14, boxSizing: 'border-box', outline: 'none',
};
const labelStyle = { display: 'block', fontWeight: 600, marginBottom: 5, fontSize: 13, color: '#444' };

export default function Exp4Output() {
  const [form, setForm] = useState({
    from: '', to: '', date: '', passengers: '1', trainClass: 'economy',
    name: '', email: '', phone: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [theme, setTheme] = useState('light');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = e => {
    e.preventDefault();
    if (form.from && form.to && form.date && form.name && form.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const text = theme === 'light' ? '#333' : '#eee';
  const cardBg = theme === 'light' ? '#f5f5f5' : '#2a2a3e';

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', color: text }}>
      {/* Theme toggle bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, color: '#1976D2' }}>🚆 Train Reservation System</h2>
        <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} style={{ padding: '6px 14px', background: '#1976D2', color: '#fff', border: 'none', borderRadius: 20, cursor: 'pointer', fontSize: 13 }}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      <div style={{ background: cardBg, borderRadius: 8, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>

        {submitted && (
          <div style={{ background: '#e8f5e9', border: '1px solid #4caf50', borderRadius: 6, padding: 12, marginBottom: 16, color: '#2e7d32', fontWeight: 600 }}>
            ✅ Reservation confirmed for {form.name} — {form.from} → {form.to} on {form.date}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Journey */}
          <h3 style={{ margin: '0 0 16px', borderBottom: '2px solid #1976D2', paddingBottom: 6, color: '#1976D2' }}>Journey Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>From Station</label>
              <select style={inputStyle} value={form.from} onChange={e => set('from', e.target.value)}>
                <option value="">Select station</option>
                {stations.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>To Station</label>
              <select style={inputStyle} value={form.to} onChange={e => set('to', e.target.value)}>
                <option value="">Select station</option>
                {stations.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Travel Date</label>
              <input type="date" style={inputStyle} value={form.date} onChange={e => set('date', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Passengers</label>
              <select style={inputStyle} value={form.passengers} onChange={e => set('passengers', e.target.value)}>
                {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Train Class</label>
              <select style={inputStyle} value={form.trainClass} onChange={e => set('trainClass', e.target.value)}>
                <option value="economy">Economy (Sleeper)</option>
                <option value="ac3">AC 3-Tier</option>
                <option value="ac2">AC 2-Tier</option>
                <option value="ac1">AC 1st Class</option>
              </select>
            </div>
          </div>

          {/* Passenger Info */}
          <h3 style={{ margin: '0 0 16px', borderBottom: '2px solid #1976D2', paddingBottom: 6, color: '#1976D2' }}>Passenger Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Full Name</label>
              <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Enter full name" />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" style={inputStyle} value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>

          <button type="submit" style={{ width: '100%', padding: 13, background: '#1976D2', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer', fontSize: 16, fontWeight: 700, letterSpacing: 0.5 }}>
            BOOK TICKET
          </button>
        </form>
      </div>
    </div>
  );
}
