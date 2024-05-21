import React, { useState } from 'react';
import axios from 'axios';

function SearchLostItems() {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [itemName, setItemName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Make a GET request to search for lost items
      const response = await axios.get('http://localhost:3001/api/search', {
        params: {
          itemName,
          category,
          location,
          date
        }
      });
      // Set the search results in state
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for lost items:', error);
      alert('Failed to search for lost items');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Search Lost Items</h1>
      <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <input type="text" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full mb-4 p-2 border border-gray-300 rounded" />
      <button onClick={handleSearch} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Search</button>

      {/* Display search results */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Search Results</h2>
        {searchResults.map(item => (
          <div key={item._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-semibold">{item.itemName}</h3>
            <p className="text-gray-600">Location: {item.location}</p>
            <p className="text-gray-600">Date: {item.timeLost}</p>
            <div>
              <p>By: <span className='text-gray-500 text-sm underline'>@{item.userId.username}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchLostItems;
