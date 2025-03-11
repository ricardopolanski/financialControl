import React, { useState } from 'react';
import FormField from './FormField';
import { validateLoginForm } from '../utils/validation';
import { loginUser } from '../services/api';
import '../css/LoginForm.css'; // We'll create this file

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const scrollToFirstError = () => {
    const firstErrorField = document.querySelector('.border-red-500');
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstErrorField.classList.add('field-highlight');
      setTimeout(() => {
        firstErrorField.classList.remove('field-highlight');
      }, 1000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    const errors = validateLoginForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setTimeout(scrollToFirstError, 100);
      return;
    }

    setValidationErrors({});
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(formData);

      if (response.errors) {
        setError(response.errors);
      } else {
        if (response.errors) {
            setError(response.errors);
        } else {
            localStorage.setItem('authToken', response.token);
                if (response.user) {
                    localStorage.setItem('firstName', response.user.firstName || '');
                    localStorage.setItem('lastName', response.user.lastName || '');
                }
                window.location.href = '/dashboard';
            }
        }
    } catch (err) {
        console.error('Login Error:', err);
        setError(['An unexpected error occurred']);
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h1 className="form-title">Welcome Back</h1>
        <p className="form-subtitle">Sign in to your account</p>

        {error && (
          <div className="alert error">
            <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
              {error.map((errMsg, index) => (
                <li key={index}>{errMsg}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <FormField
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            error={validationErrors.username}
            isRequired={true}
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={validationErrors.password}
            isRequired={true}
          />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="/forgot-password" className="forgot-password-link">
                Forgot your password?
              </a>
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="signup-link">
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
