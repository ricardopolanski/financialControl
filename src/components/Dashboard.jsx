import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    // Simulate fetching user data
    setTimeout(() => {
      // This is a placeholder - in a real app, you'd fetch user data from your API
      setUser({
        username: 'User',
        firstName: localStorage.getItem('firstName') || 'Guest',
        lastName: localStorage.getItem('lastName') || 'User'
      });
      setLoading(false);
    }, 1000);
  }, [navigate]);

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    
    // Redirect to login
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <h1>MyApp</h1>
        </div>
        <div className="dashboard-user">
          <span>Welcome, {user.firstName} {user.lastName}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome to your Dashboard!</h2>
          <p>You've successfully logged in, but there's nothing here yet.</p>
          <p>We're working on building amazing features for you.</p>
          <div className="dashboard-illustration">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="#e0f2ff" />
              <rect x="70" y="60" width="60" height="80" rx="4" fill="#4f46e5" />
              <rect x="80" y="70" width="40" height="5" rx="2" fill="white" />
              <rect x="80" y="85" width="40" height="5" rx="2" fill="white" />
              <rect x="80" y="100" width="40" height="5" rx="2" fill="white" />
              <rect x="80" y="115" width="20" height="5" rx="2" fill="white" />
            </svg>
          </div>
        </div>

        <div className="placeholder-grid">
          <div className="placeholder-card">
            <div className="placeholder-icon">📊</div>
            <h3>Analytics</h3>
            <p>Track your performance and growth metrics</p>
            <span className="coming-soon">Coming Soon</span>
          </div>
          <div className="placeholder-card">
            <div className="placeholder-icon">📝</div>
            <h3>Tasks</h3>
            <p>Manage your projects and track progress</p>
            <span className="coming-soon">Coming Soon</span>
          </div>
          <div className="placeholder-card">
            <div className="placeholder-icon">📅</div>
            <h3>Calendar</h3>
            <p>Schedule and organize your appointments</p>
            <span className="coming-soon">Coming Soon</span>
          </div>
          <div className="placeholder-card">
            <div className="placeholder-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Customize your dashboard experience</p>
            <span className="coming-soon">Coming Soon</span>
          </div>
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
