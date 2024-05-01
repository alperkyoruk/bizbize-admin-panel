import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditEvent.css';
import Sidebar from '../../components/sidebar/sidebar';

const EditEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({
    id: '',
    date: '',
    guestName: '',
    title: '',
    linkedin: '',
    isActive: 0  // Initial state for isActive as integer
  });

  const accesstoken = document.cookie.split(';').find(cookie => cookie.includes('token'))?.split('=')[1];

  const getHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${accesstoken}`
      }
    };
  };

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`https://api.bin.net.tr:8080/api/events/getEventById?eventId=${id}`, getHeaders());
      const data = await response.json();
      if (data.success) {
        setEvent({
          id: data.data.id || '',
          date: data.data.date ? data.data.date.slice(0, 16) : '', // Slices the date to 'YYYY-MM-DDTHH:MM'
          guestName: data.data.guestName || '',
          title: data.data.title || '',
          linkedin: data.data.linkedin || '',
          isActive: data.data.isActive ? 1 : 0  // Convert boolean to 0 or 1
        });
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEvent(prevEvent => ({
        ...prevEvent,
        [name]: checked ? 1 : 0  // Convert checkbox state to 0 or 1
      }));
    } else {
      setEvent(prevEvent => ({
        ...prevEvent,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.bin.net.tr:8080/api/events/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accesstoken}`
        },
        body: JSON.stringify(event)
      });
      const data = await response.json();
      if (data.success) {
        alert('Event updated successfully');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="edit-event-container">
      <Sidebar />
      <div className='right-side-container'>
        <h1>Edit Event</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="guestName">Guest Name:</label>
            <input type="text" id="guestName" name="guestName" value={event.guestName} onChange={handleChange} />
          </div>
          <div className="form-control">
            <label htmlFor="eventDate">Event Date:</label>
            <input type="datetime-local" id="eventDate" name="date" value={event.date} onChange={handleChange} />
          </div>
          <div className="form-control">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={event.title} onChange={handleChange} />
          </div>
          <div className="form-control">
            <label htmlFor="linkedin">LinkedIn Profile:</label>
            <input type="text" id="linkedin" name="linkedin" value={event.linkedin} onChange={handleChange} />
          </div>
          <div className="form-control">
            <label htmlFor="isActive">Is Active:</label>
            <input type="checkbox" id="isActive" name="isActive" checked={event.isActive === 1} onChange={handleChange} />
          </div>
          <button type="submit" className="btn-submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
