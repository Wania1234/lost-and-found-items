import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    const fetchUserLostItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/userLostItems/${window.localStorage.getItem('uid')}`);
        setLostItems(response.data);
      } catch (error) {
        console.error('Error fetching user lost items:', error);
      }
    };

    fetchUserLostItems();
  }, [userId]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      {window.localStorage.getItem('username') ? (
        <div>
          <p className="mb-2"><span className="font-semibold">Full Name:</span> {window.localStorage.getItem('name')}</p>
          <p className="mb-2"><span className="font-semibold">Username:</span> {window.localStorage.getItem('username')}</p>
          {/* Add more profile fields here */}
        </div>
      ) : (
        <p>Login First</p>
      )}
      <h3 className="text-xl font-semibold mt-6 mb-4">Lost Items Posted</h3>
      <div>
        {lostItems.length > 0 ? (
          lostItems.map(item => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <p className="font-semibold mb-2">Item Name: {item.itemName}</p>
              <p className="text-gray-600">Location: {item.location}</p>
              {/* Add more item details here */}
            </div>
          ))
        ) : (
          <p>No lost items posted by this user.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
