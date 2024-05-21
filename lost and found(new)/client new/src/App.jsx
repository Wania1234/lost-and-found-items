import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import { Signup } from './Auth/signup';
import ReportLostItem from './ReportLostItem';
import SearchLostItems from './SearchLostItem';
import Navbar from './components/Navbar';
import LostItemsFeed from './LostItemsFeed';
import UserProfile from './UserProfile';

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Login />} />
        <Route exact path='/home' element={<LostItemsFeed />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/report" element={<ReportLostItem />} />
        <Route path="/search" element={<SearchLostItems />} />
        <Route path="/manage-profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
