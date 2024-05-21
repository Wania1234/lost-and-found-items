import React, { useEffect, useState } from 'react';
import Message from './Message';
import './style.css';
import axios from 'axios';

function LostItemsFeed() {
  const [lostItems, setLostItems] = useState([]);
  const [showMessageModule, setShowMessageModule] = useState(false);
  const [contactUserId, setContactUserId] = useState(null);

  useEffect(() => {
    // Fetch lost items data from backend
    const fetchLostItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/lostItems');
        setLostItems(response.data);
      } catch (error) {
        console.error('Error fetching lost items:', error);
      }
    };

    fetchLostItems();
  }, []);

  const handleContactClick = (userId) => {
    setContactUserId(userId);
    setShowMessageModule(true);
  };
  const handleCloseMessageModule = () => {
    setShowMessageModule(false);
    setContactUserId(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Lost Items Feed</h1>
      {lostItems.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold">{item.itemName}</h2>
          <p className="text-gray-600">{item.location}</p>
          <p className="text-gray-600">{item.timeLost}</p>
          <p className="text-gray-600">{item.category}</p>
          <div>
              <p>By: <span className='text-gray-500 text-sm underline'>@{item.userId?.username}</span></p>
          </div>
          <div>
            <button className=' mt-2 contact-btn'   onClick={() => handleContactClick(item.userId._id)} >Contact {item.userId?.username}</button>
          </div>
        </div>
      ))}
       {showMessageModule && contactUserId!= null && (
          <Message userId={contactUserId} onClose={handleCloseMessageModule} />
        )}
    </div>
  );
}

export default LostItemsFeed;
