// HomePage.js

import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import Navbar from '../../components/navbar/navbar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className='right-container'>
        <Navbar />
      <div className="content">
        <h1>Welcome to the Admin Panel</h1>
        <p>This is the home page content...</p>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
