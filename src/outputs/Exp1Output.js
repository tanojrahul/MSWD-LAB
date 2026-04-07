import React, { useState, useEffect } from 'react';

/* ── PassengerList ── */
const PassengerList = () => {
  const [passengers, setPassengers] = useState([
    { id: 1, name: 'John Doe',    email: 'john@example.com',  status: 'Confirmed' },
    { id: 2, name: 'Jane Smith',  email: 'jane@example.com',  status: 'Confirmed' },
    { id: 3, name: 'Mike Johnson',email: 'mike@example.com',  status: 'Pending'   },
  ]);
  const [np, setNp] = useState({ name: '', email: '', status: 'Pending' });
  const add = () => {
    if (np.name && np.email) {
      setPassengers([...passengers, { id: Date.now(), ...np }]);
      setNp({ name: '', email: '', status: 'Pending' });
    }
  };
  const remove = (id) => setPassengers(passengers.filter(p => p.id !== id));
  const input = { padding: '8px', marginRight: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 13 };
  return (
    <div>
      <h2 style={{ color: '#007bff' }}>Passenger List</h2>
      <div style={{ background: '#f4f8ff', padding: 16, borderRadius: 8, marginBottom: 16 }}>
        <input style={input} placeholder="Name" value={np.name} onChange={e => setNp({ ...np, name: e.target.value })} />
        <input style={input} placeholder="Email" value={np.email} onChange={e => setNp({ ...np, email: e.target.value })} />
        <select style={input} value={np.status} onChange={e => setNp({ ...np, status: e.target.value })}>
          <option>Pending</option><option>Confirmed</option><option>Cancelled</option>
        </select>
        <button onClick={add} style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Add</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ background: '#007bff', color: '#fff' }}>
          {['ID','Name','Email','Status','Action'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left' }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {passengers.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '10px 14px' }}>{p.id}</td>
              <td style={{ padding: '10px 14px' }}>{p.name}</td>
              <td style={{ padding: '10px 14px' }}>{p.email}</td>
              <td style={{ padding: '10px 14px' }}>
                <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 12, background: p.status === 'Confirmed' ? '#d4edda' : p.status === 'Pending' ? '#fff3cd' : '#f8d7da', color: p.status === 'Confirmed' ? '#155724' : p.status === 'Pending' ? '#856404' : '#721c24' }}>{p.status}</span>
              </td>
              <td style={{ padding: '10px 14px' }}>
                <button onClick={() => remove(p.id)} style={{ padding: '4px 10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ── StudentAttendance ── */
const StudentAttendance = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Brown', rollNo: '101', attendance: true },
    { id: 2, name: 'Bob Wilson',  rollNo: '102', attendance: false },
    { id: 3, name: 'Charlie Davis',rollNo: '103', attendance: true },
    { id: 4, name: 'Diana Evans', rollNo: '104', attendance: false },
    { id: 5, name: 'Edward Green',rollNo: '105', attendance: true },
  ]);
  const toggle = id => setStudents(students.map(s => s.id === id ? { ...s, attendance: !s.attendance } : s));
  const present = students.filter(s => s.attendance).length;
  const pct = ((present / students.length) * 100).toFixed(1);
  return (
    <div>
      <h2 style={{ color: '#28a745' }}>Student Attendance</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
        {[['Present', present, '#28a745'], ['Absent', students.length - present, '#dc3545'], ['Percentage', pct + '%', '#007bff']].map(([label, val, bg]) => (
          <div key={label} style={{ padding: 14, background: bg, color: '#fff', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 13, opacity: 0.85 }}>{label}</div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{val}</div>
          </div>
        ))}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ background: '#007bff', color: '#fff' }}>
          {['Roll No','Name','Status','Toggle'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left' }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '10px 14px' }}>{s.rollNo}</td>
              <td style={{ padding: '10px 14px' }}>{s.name}</td>
              <td style={{ padding: '10px 14px' }}>
                <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 12, background: s.attendance ? '#d4edda' : '#f8d7da', color: s.attendance ? '#155724' : '#721c24' }}>{s.attendance ? 'Present' : 'Absent'}</span>
              </td>
              <td style={{ padding: '10px 14px' }}>
                <button onClick={() => toggle(s.id)} style={{ padding: '4px 12px', background: s.attendance ? '#dc3545' : '#28a745', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>
                  Mark {s.attendance ? 'Absent' : 'Present'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ── Timer ── */
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let interval;
    if (running) interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);
  const fmt = t => `${String(Math.floor(t/3600)).padStart(2,'0')}:${String(Math.floor((t%3600)/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;
  return (
    <div style={{ textAlign: 'center', border: '2px solid #007bff', borderRadius: 10, padding: 24, maxWidth: 280, margin: '0 auto' }}>
      <h3 style={{ color: '#007bff' }}>Timer</h3>
      <div style={{ fontSize: 42, fontWeight: 700, fontFamily: 'monospace', background: '#f0f8ff', padding: '10px 20px', borderRadius: 8, margin: '16px 0' }}>{fmt(seconds)}</div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button onClick={() => setRunning(true)}  disabled={running}  style={{ padding: '8px 16px', background: running  ? '#ccc' : '#28a745', color: '#fff', border: 'none', borderRadius: 4, cursor: running  ? 'not-allowed' : 'pointer' }}>Start</button>
        <button onClick={() => setRunning(false)} disabled={!running} style={{ padding: '8px 16px', background: !running ? '#ccc' : '#ffc107', color: '#000', border: 'none', borderRadius: 4, cursor: !running ? 'not-allowed' : 'pointer' }}>Pause</button>
        <button onClick={() => { setSeconds(0); setRunning(false); }} style={{ padding: '8px 16px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Reset</button>
      </div>
    </div>
  );
};

/* ── CourseList ── */
const CourseList = () => {
  const courses = [
    { id: 1, title: 'React Fundamentals', instructor: 'John Smith', duration: '4 weeks', level: 'Beginner', enrolled: 234, price: 49 },
    { id: 2, title: 'Advanced JavaScript', instructor: 'Jane Doe',  duration: '6 weeks', level: 'Intermediate', enrolled: 189, price: 69 },
    { id: 3, title: 'Full Stack Development', instructor: 'Mike J', duration: '12 weeks', level: 'Advanced', enrolled: 156, price: 129 },
  ];
  return (
    <div>
      <h2 style={{ color: '#6c757d' }}>Course List</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {courses.map(c => (
          <div key={c.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, background: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, color: '#007bff' }}>{c.title}</h4>
              <span style={{ fontWeight: 700, color: '#28a745', fontSize: 18 }}>${c.price}</span>
            </div>
            <p style={{ margin: '6px 0 4px', color: '#555', fontSize: 13 }}>👤 {c.instructor} · ⏱ {c.duration} · 🎓 {c.level} · 👥 {c.enrolled} enrolled</p>
            <button style={{ marginTop: 8, padding: '6px 14px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>Enroll Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Main Export with Tabs ── */
const tabs = ['Passenger List', 'Student Attendance', 'Timer', 'Course List'];
const components = [<PassengerList />, <StudentAttendance />, <Timer />, <CourseList />];

export default function Exp1Output() {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{ padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: tab === i ? 700 : 400, background: tab === i ? '#007bff' : '#e9ecef', color: tab === i ? '#fff' : '#333', fontSize: 13 }}>{t}</button>
        ))}
      </div>
      {components[tab]}
    </div>
  );
}
