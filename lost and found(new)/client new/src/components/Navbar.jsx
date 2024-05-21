import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('uid');
      navigate('/')
      alert('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out');
    }
  };

  useEffect(() => {
    if (!window.localStorage.getItem('username')) {
      if (window.location.pathname !== '/signup') {
        navigate('/');
      }
    }
  }, [navigate])

  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/home" className="text-white font-semibold text-lg">Lost and Found</Link>
          <div className="flex space-x-4">
            {window.localStorage.getItem('username') ? (
              <>
                <Link to="/report" className="text-white hover:text-gray-200">Report Lost Item</Link>
                <Link to="/search" className="text-white hover:text-gray-200">Search Lost Items</Link>
                <Link to="/manage-profile" className="text-white hover:text-gray-200">Manage Profile</Link>
                <button onClick={handleLogout} className="text-white hover:text-gray-200">Logout</button>
              </>
            ) : (
              <>
                <Link to="/" className="text-white hover:text-gray-200">Login</Link>
                <Link to="/signup" className="text-white hover:text-gray-200">Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
