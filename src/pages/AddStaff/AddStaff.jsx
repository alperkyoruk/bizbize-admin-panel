// AddStaff.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './AddStaff.css'; // Import CSS for styling

const accesstoken = document.cookie.split(';').find(cookie => cookie.includes('token'))?.split('=')[1];

const getHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${accesstoken}`
    }
  };
};

const AddStaff = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    linkedin: '',
    department: '',
    photoUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://api.bin.net.tr:8080/api/staff/addStaff', formData, getHeaders());
      // You can handle success actions here, like showing a success message or redirecting the user
      console.log('Staff added successfully!');
    } catch (error) {
      // Handle error responses here
      console.error('Error adding staff:', error);
    }
  };

  return (
    <div className="add-staff-container">
      <h2>Add New Staff</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>
        <br />
        <label>
          LinkedIn:
          <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
        </label>
        <br />
        <label>
          Department:
          <input type="text" name="department" value={formData.department} onChange={handleChange} />
        </label>
        <br />
        <label>
          Photo URL:
          <input type="text" name="photoUrl" value={formData.photoUrl} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Add Staff</button>
      </form>
    </div>
  );
};

export default AddStaff;
