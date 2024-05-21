import React, { useState } from 'react';
import axios from 'axios';

function ReportLostItem() {
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [timeLost, setTimeLost] = useState('');
  const [category, setCategory] = useState('');

  const handleReport = async () => {
    try {
      // Make a POST request to report the lost item
      await axios.post('http://localhost:3001/api/lostItems', {
        itemName,
        location,
        timeLost,
        category,
        userId: window.localStorage.getItem('uid'),
      });
      // Reset the form fields after successful report
      setItemName('');
      setLocation('');
      setTimeLost('');
      setCategory('');
      alert('Lost item reported successfully');
    } catch (error) {
      console.error('Error reporting lost item:', error);
      alert('Failed to report lost item');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Report Lost Item</h1>
      <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <input type="text" placeholder="Time Lost" value={timeLost} onChange={(e) => setTimeLost(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <button onClick={handleReport} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Report Lost Item</button>
    </div>
  );
}

export default ReportLostItem;
