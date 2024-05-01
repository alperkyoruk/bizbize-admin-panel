import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EventList.css';
import Sidebar from '../../components/sidebar/sidebar';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://api.bin.net.tr:8080/api/events/getEvents');
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    // Filter events into upcoming and past events
    const currentDate = new Date();
    const upcoming = events.filter(event => new Date(event.date) > currentDate);
    const past = events.filter(event => new Date(event.date) <= currentDate);
    setUpcomingEvents(upcoming);
    setPastEvents(past);
  }, [events]);

  return (
    <div className="event-list-container">
      <Sidebar />
      <div className="right-side-container">
        <h1>Event List</h1>
        <section>
          <h2>Upcoming Events</h2>
          <table className="event-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Guest Name</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {upcomingEvents.map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.guestName}</td>
                  <td>
                    <Link to={`/events/${event.id}`} className="view-details-link">View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2>Past Events</h2>
          <table className="event-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Guest Name</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {pastEvents.map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.guestName}</td>
                  <td>
                    <Link to={`/events/${event.id}`} className="view-details-link">View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default EventList;
