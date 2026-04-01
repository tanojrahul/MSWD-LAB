import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alice', text: 'Hey, how are you?', time: '10:30 AM' },
    { id: 2, sender: 'You', text: 'I am doing great!', time: '10:31 AM' },
    { id: 3, sender: 'Alice', text: 'That\'s awesome!', time: '10:32 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString()
      }]);
      setNewMessage('');
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Chat</h1>
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '5px',
        height: '400px',
        overflowY: 'auto',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        marginBottom: '15px'
      }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            marginBottom: '15px',
            textAlign: msg.sender === 'You' ? 'right' : 'left'
          }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: msg.sender === 'You' ? '#007bff' : '#e9ecef',
              color: msg.sender === 'You' ? 'white' : 'black',
              padding: '10px 15px',
              borderRadius: '10px',
              maxWidth: '70%'
            }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '12px', opacity: 0.7 }}>
                {msg.sender} - {msg.time}
              </p>
              <p style={{ margin: 0 }}>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px'
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
