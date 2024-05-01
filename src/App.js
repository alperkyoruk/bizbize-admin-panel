// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import LoginPage from './pages/loginpage/LoginPage';
import PrivateRoute from './PrivateRoute';
import { useAuth } from './security/AuthProvider';
import AuthProvider from './security/AuthProvider';
import StaffList from './pages/StaffList/StaffList';
import AddStaff from './pages/AddStaff/AddStaff';
import StaffDetails from './pages/StaffDetails/StaffDetails';
import EventList from './pages/EventList/EventList';
import EventDetails from './pages/EventDetails/EventDetails';
import EditEvent from './pages/EditEvent/EditEvent';
import CreateEvent from './pages/CreateEvent/CreateEvent';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/eventlist" element={<EventList />} />
              <Route path= "/events/:id" element={<EventDetails />} />
              <Route path= "/editevent/:id" element={<EditEvent />} />
              <Route path = "/stafflist" element = {<StaffList />} />
              <Route path = "/addstaff" element = {<AddStaff />} />
              <Route path = "/addevent" element = {<CreateEvent />} />
              <Route path = "/staff/:id" element = {<StaffDetails />} />
              
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
