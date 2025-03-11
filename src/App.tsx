import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserRegistrationForm from './components/userRegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<UserRegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Default route - redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
