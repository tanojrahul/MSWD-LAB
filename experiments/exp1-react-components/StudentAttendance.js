import React, { useState } from 'react';

const StudentAttendance = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Brown', rollNo: '101', attendance: true },
    { id: 2, name: 'Bob Wilson', rollNo: '102', attendance: false },
    { id: 3, name: 'Charlie Davis', rollNo: '103', attendance: true },
    { id: 4, name: 'Diana Evans', rollNo: '104', attendance: false },
    { id: 5, name: 'Edward Green', rollNo: '105', attendance: true }
  ]);

  const toggleAttendance = (id) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, attendance: !student.attendance } : student
    ));
  };

  const presentCount = students.filter(s => s.attendance).length;
  const absentCount = students.filter(s => !s.attendance).length;
  const attendancePercentage = ((presentCount / students.length) * 100).toFixed(2);

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Student Attendance</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr', 
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#28a745', 
          color: 'white',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          <h3>Present</h3>
          <p style={{ fontSize: '24px', margin: '0' }}>{presentCount}</p>
        </div>
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#dc3545', 
          color: 'white',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          <h3>Absent</h3>
          <p style={{ fontSize: '24px', margin: '0' }}>{absentCount}</p>
        </div>
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#007bff', 
          color: 'white',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          <h3>Percentage</h3>
          <p style={{ fontSize: '24px', margin: '0' }}>{attendancePercentage}%</p>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Roll No</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Student Name</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Toggle</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{student.rollNo}</td>
              <td style={{ padding: '12px' }}>{student.name}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                <span style={{
                  padding: '5px 10px',
                  borderRadius: '20px',
                  backgroundColor: student.attendance ? '#28a745' : '#dc3545',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {student.attendance ? 'Present' : 'Absent'}
                </span>
              </td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={student.attendance}
                  onChange={() => toggleAttendance(student.id)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAttendance;
