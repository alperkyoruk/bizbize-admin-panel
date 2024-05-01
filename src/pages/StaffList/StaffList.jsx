import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StaffList.css'; 
import Sidebar from '../../components/sidebar/sidebar';

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch('https://api.bin.net.tr:8080/api/staff/getStaff');
      const data = await response.json();
      if (data.success) {
        setStaffList(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  if(staffList === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="staff-list-container">
      <Sidebar />
      <div className="right-side-container">
        <h1>Staff List</h1>
        <table className="staff-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.firstName}</td>
                <td>{staff.lastName}</td>
                <td>{staff.department}</td>
                <td>
                  <Link to={`/staff/${staff.id}`} className="view-details-link">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffList;
