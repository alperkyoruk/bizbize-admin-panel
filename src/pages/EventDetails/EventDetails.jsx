// EventDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './EventDetails.css'; // Import EventDetails CSS file
import Sidebar from '../../components/sidebar/sidebar';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`https://api.bin.net.tr:8080/api/events/getEventById?eventId=${id}`);
      const data = await response.json();
      if (data.success) {
        setEvent(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://api.bin.net.tr:8080/api/events/delete?eventId=${id}`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        alert('Event deleted successfully');


      } else {
        console.error('Failed to delete event:', data.message);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };


  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details-page-container">
      <Sidebar />
      <div className='event-details-container'>
        <div className='right-side-container'>
          <h1>Event Details</h1>
          <div className="event-details">
            <p><strong>Event ID:</strong> {event.id}</p>
            <p><strong>Title:</strong> {event.title}</p>
            <p><strong>Event Date:</strong> {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}</p>            <p><strong>Guest Name:</strong> {event.guestName}</p>
            <p><strong>LinkedIn:</strong> {event.linkedin}</p>
            <p><strong>Is Active:</strong> {event.isActive}</p>
          </div>
          <Link to={`/editEvent/${id}`} className="edit-event-link">Edit Event</Link>
          <Link to ={`/eventList`} className="delete-event-button" onClick={handleDelete}>Delete Event</Link>
          
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
