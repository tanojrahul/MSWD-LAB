import React, { useState, useEffect } from 'react';

const allJobs = [
  { id: 1, title: 'React Developer',       company: 'Tech Corp',      salary: '$80k–$100k', location: 'Remote',        type: 'Full-time' },
  { id: 2, title: 'Senior JavaScript Dev', company: 'Web Solutions',  salary: '$100k–$120k',location: 'NYC',           type: 'Full-time' },
  { id: 3, title: 'Node.js Developer',     company: 'Cloud Systems',  salary: '$75k–$95k',  location: 'San Francisco', type: 'Full-time' },
  { id: 4, title: 'Frontend Engineer',     company: 'Design Studio',  salary: '$70k–$90k',  location: 'Boston',        type: 'Contract'  },
  { id: 5, title: 'Full Stack Developer',  company: 'StartUp Hub',    salary: '$85k–$110k', location: 'Remote',        type: 'Full-time' },
  { id: 6, title: 'UI/UX Developer',       company: 'Creative Agency',salary: '$65k–$85k',  location: 'Los Angeles',   type: 'Part-time' },
];

const typeColors = { 'Full-time': '#007bff', 'Contract': '#fd7e14', 'Part-time': '#6f42c1' };

export default function Exp5Output() {
  const [location, setLocation]   = useState('');
  const [type, setType]           = useState('');
  const [sort, setSort]           = useState('title');
  const [results, setResults]     = useState(allJobs);
  const [theme, setTheme]         = useState('light');

  useEffect(() => {
    let list = [...allJobs];
    if (location) list = list.filter(j => j.location.toLowerCase().includes(location.toLowerCase()));
    if (type)     list = list.filter(j => j.type === type);
    if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
    setResults(list);
  }, [location, type, sort]);

  const isDark = theme === 'dark';
  const bg      = isDark ? '#1a1a2e' : '#f8f9fa';
  const cardBg  = isDark ? '#16213e' : '#fff';
  const text     = isDark ? '#e0e0e0' : '#333';
  const muted    = isDark ? '#aaa'    : '#666';
  const border   = isDark ? '#2a2a4e' : '#ddd';
  const inputBg  = isDark ? '#0f3460' : '#fff';

  const inputStyle = { padding: '8px 12px', border: `1px solid ${border}`, borderRadius: 5, fontSize: 13, background: inputBg, color: text, width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ background: bg, color: text, padding: 16, borderRadius: 10, fontFamily: 'system-ui, sans-serif' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isDark ? '#0f3460' : '#343a40', padding: '12px 18px', borderRadius: 7, marginBottom: 20 }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>💼 Jobs Catalog</span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ color: '#adb5bd', fontSize: 13 }}>{results.length} jobs found</span>
          <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} style={{ padding: '5px 12px', background: '#ffc107', color: '#000', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </nav>

      {/* Filters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 10, marginBottom: 20 }}>
        <input style={inputStyle} placeholder="Filter by location..." value={location} onChange={e => setLocation(e.target.value)} />
        <select style={inputStyle} value={type} onChange={e => setType(e.target.value)}>
          <option value="">All Types</option>
          {['Full-time','Contract','Part-time'].map(t => <option key={t}>{t}</option>)}
        </select>
        <select style={inputStyle} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="title">Sort by Title</option>
          <option value="salary">Sort by Salary</option>
        </select>
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
        {results.length === 0 ? (
          <p style={{ color: muted, gridColumn: '1/-1', textAlign: 'center', padding: 30 }}>No jobs match your filters.</p>
        ) : results.map(job => (
          <div key={job.id} style={{ background: cardBg, border: `1px solid ${border}`, borderLeft: `4px solid #007bff`, borderRadius: 8, padding: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <h4 style={{ margin: '0 0 4px', color: '#007bff', fontSize: 15 }}>{job.title}</h4>
            <p style={{ margin: '0 0 10px', color: muted, fontSize: 13 }}>{job.company}</p>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
              <span style={{ padding: '2px 9px', borderRadius: 12, fontSize: 11, background: typeColors[job.type], color: '#fff', fontWeight: 600 }}>{job.type}</span>
              <span style={{ padding: '2px 9px', borderRadius: 12, fontSize: 11, background: isDark ? '#2a2a4e' : '#e9ecef', color: text }}>📍 {job.location}</span>
            </div>
            <p style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700, color: '#28a745' }}>{job.salary}</p>
            <button style={{ width: '100%', padding: '7px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
