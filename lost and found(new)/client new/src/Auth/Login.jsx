import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });
      // Handle successful login
      window.localStorage.setItem('username', response.data.username);
      window.localStorage.setItem('name', response.data.name);
      window.localStorage.setItem('uid', response.data._id);
      navigate('/home')
      alert('Login successful');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to log in');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</button>
      <p className="mt-4">Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
    </div>
  );
}

export default Login;
