import React, { useState } from 'react';
import './CreateEvent.css';
import Sidebar from '../../components/sidebar/sidebar';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventDate: '',
    guestName: '',
    title: '',
    linkedin: '',
    isActive: ''
  });

  const accesstoken = document.cookie.split(';').find(cookie => cookie.includes('token'))?.split('=')[1];

  const getHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${accesstoken}`
      }
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.bin.net.tr:8080/api/events/add',getHeaders(), {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        console.log('Event added successfully.');
        // Clear the form after successful submission
        setFormData({
          eventDate: '',
          guestName: '',
          title: '',
          linkedin: '',
          isActive: ''
        });
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="create-event-container">
      <Sidebar />
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="eventDate">Event Date:</label>
          <input 
            type="datetime-local" 
            id="eventDate" 
            name="eventDate" 
            value={formData.eventDate} 
            onChange={handleChange} />
        </div>
        <div className="form-control">
          <label htmlFor="guestName">Guest Name:</label>
          <input 
            type="text" 
            id="guestName" 
            name="guestName" 
            value={formData.guestName} 
            onChange={handleChange} />
        </div>
        <div className="form-control">
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} />
        </div>
        <div className="form-control">
          <label htmlFor="linkedin">LinkedIn Profile:</label>
          <input 
            type="text" 
            id="linkedin" 
            name="linkedin" 
            value={formData.linkedin} 
            onChange={handleChange} />
        </div>
        <div className="form-control">
          <label htmlFor="isActive">Is Active:</label>
          <input 
            type="checkbox" 
            id="isActive" 
            name="isActive" 
            checked={formData.isActive === 'true'} // assuming the value is a string 'true' or 'false'
            onChange={e => setFormData(prev => ({...prev, isActive: e.target.checked ? 'true' : 'false'}))} />
        </div>
        <button type="submit" className="btn-submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
