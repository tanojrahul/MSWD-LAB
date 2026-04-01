import React, { useState } from 'react';
import axios from 'axios';

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    grade: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.rollNo || !formData.grade) {
      alert('Please fill all fields');
      return;
    }

    try {
      // Using JSONPlaceholder as fake API for POST demonstration
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: formData.name,
        body: `Email: ${formData.email}, Roll: ${formData.rollNo}, Grade: ${formData.grade}`,
        userId: Math.floor(Math.random() * 10) + 1
      });

      setResponseMessage(`✓ Student added successfully! (ID: ${response.data.id})`);
      setSubmitted(true);
      setFormData({ name: '', email: '', rollNo: '', grade: '' });

      setTimeout(() => {
        setSubmitted(false);
        setResponseMessage('');
      }, 3000);
    } catch (error) {
      setResponseMessage('❌ Failed to add student');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto' }}>
      <h2>Add Student Data (POST Request)</h2>
      <form onSubmit={handleSubmit} style={{
        border: '1px solid #ddd',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Student Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Roll No:</label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Grade:</label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxSizing: 'border-box'
            }}
          >
            <option value="">Select Grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Add Student
        </button>
      </form>

      {responseMessage && (
        <div style={{
          marginTop: '15px',
          padding: '15px',
          backgroundColor: submitted ? '#d4edda' : '#f8d7da',
          color: submitted ? '#155724' : '#721c24',
          borderRadius: '5px'
        }}>
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default AddStudentForm;
