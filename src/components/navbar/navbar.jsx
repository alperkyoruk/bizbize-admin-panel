// Navbar.js

import React from 'react';
import { useAuth } from '../../security/AuthProvider';
import './navbar.css';

const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="navbar">
      
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Navbar;
