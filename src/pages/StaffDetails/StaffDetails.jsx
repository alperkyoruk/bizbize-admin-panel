import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './StaffDetails.css';
import Sidebar from '../../components/sidebar/sidebar';

const StaffDetails = () => {
  const { id } = useParams();
  const [staffDetails, setStaffDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffDetails = async () => {
      const url = `https://api.bin.net.tr:8080/api/staff/getStaffById?staffId=${id}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          setStaffDetails(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch staff details');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://api.bin.net.tr:8080/api/staff/delete?staffId=${id}`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        alert('Staff deleted successfully');
        navigate('/dashboard');
      } else {
        console.error('Failed to delete staff:', data.message);
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="guest-details">
      <Sidebar />
      <div className="right-side-guest">
        <h1>Staff Details</h1>
        <p><strong>First Name:</strong> {staffDetails.firstName}</p>
        <p><strong>Last Name:</strong> {staffDetails.lastName}</p>
        <p><strong>LinkedIn:</strong> {staffDetails.linkedin}</p>
        <p><strong>Department:</strong> {staffDetails.department}</p>
        {staffDetails.photoUrl && (
          <div>
            <h3>Photo:</h3>
            <img src={staffDetails.photoUrl} alt="Staff Photo" />
          </div>
        )}
        <div className="event-details-link-container">
          <button className="delete-button" onClick={handleDelete}>Delete Staff</button>
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
