import React, { useState } from 'react';

const Posts = () => {
  const [posts] = useState([
    { id: 1, author: 'Alice', title: 'React Router Tutorial', content: 'Learn about React Router basics...', likes: 45 },
    { id: 2, author: 'Bob', title: 'JavaScript ES6 Features', content: 'Exploring modern JavaScript features...', likes: 32 },
    { id: 3, author: 'Charlie', title: 'Web Development Tips', content: 'Best practices for web development...', likes: 78 },
  ]);

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Posts Feed</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {posts.map(post => (
          <div key={post.id} style={{
            border: '1px solid #ddd',
            padding: '20px',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>{post.title}</h3>
            <p style={{ color: '#666' }}>By <strong>{post.author}</strong></p>
            <p>{post.content}</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              <button style={{
                padding: '8px 15px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                👍 Like ({post.likes})
              </button>
              <button style={{
                padding: '8px 15px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                💬 Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
