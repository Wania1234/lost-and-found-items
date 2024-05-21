import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const handleSignup = async () => {
    try {
      // Send a POST request to the signup API endpoint
      const response = await axios.post('http://localhost:3001/api/users', { username, password, name });
      console.log('Signup successful:', response.data);
      alert("Login now")
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <button onClick={handleSignup} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Sign Up</button>
      <p className="mt-4">Already have an account? <Link to="/" className="text-blue-500">Login</Link></p>
    </div>
  );
}
