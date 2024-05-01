import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const [eventsOpen, setEventsOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const toggleEvents = () => {
    setEventsOpen(!eventsOpen);
  };

  const toggleGuests = () => {
    setGuestsOpen(!guestsOpen);
  };

  return (
    <div className="sidebar">
      <Link to="/dashboard"><button>Dashboard</button></Link>
      <button onClick={toggleEvents}>Events</button>
      {eventsOpen && (
        <div className="sidebar-section">
          <Link to="/addevent"><button>Add Event</button></Link>
          <Link to="/eventlist"><button>Event List</button></Link>
        </div>
      )}
      <button onClick={toggleGuests}>Staff</button>
      {guestsOpen && (
        <div className="sidebar-section">
          <Link to="/addstaff"><button>Add Staff</button></Link>
          <Link to="/stafflist"><button>Staff List</button></Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
