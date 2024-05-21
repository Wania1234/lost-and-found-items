import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Message({ userId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loginUser, setLoginUser] = useState('');
  

  useEffect(() => {
    const fetchMessages = async () => {
      try {
		var loginuser = localStorage.getItem('uid');
        const response = await axios.get(`http://localhost:3001/api/messages/${loginuser}?currentUserId=${userId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
		fetchMessages();

  }, [userId]);

  const sendMessage = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/sendmessage`, {
        userId: userId,
        message: newMessage,
		currentUserId: loginUser

      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="message-module">
      <button onClick={onClose}>Close</button>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
           <h5>{msg.from}</h5><p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="send-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Message;