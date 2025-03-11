import React, { useState } from 'react';
import PersonalInfoSection from './PersonalInfoSection';
import CompanyInfoSection from './CompanyInfoSection';
import { validateForm } from '../utils/validation';
import { registerUser } from '../services/api';
import '../css/UserRegistrationForm.css'; // Importing the CSS file

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    securityQuestion: '',
    securityAnsware: '', // Typo here, consider fixing it to `securityAnswer`
    active: true,
    company: {
      companyName: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const scrollToFirstError = () => {
    // Find the first element with an error
    const firstErrorField = document.querySelector('.border-red-300');
    if (firstErrorField) {
      // Scroll to the field with smooth behavior
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a temporary highlight effect
      firstErrorField.classList.add('field-highlight');
      // Remove the highlight class after animation completes
      setTimeout(() => {
        firstErrorField.classList.remove('field-highlight');
      }, 1000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form before submitting
  const errors = validateForm(formData);
  if (Object.keys(errors).length > 0) {
    setValidationErrors(errors);
    // Add this line to scroll to the first error
    setTimeout(scrollToFirstError, 100);
    return;
  }
  
    setValidationErrors({});
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      const response = await registerUser(formData);
  
      if (response.errors) {
        // If errors are present in the response, update the error state with the error messages
        setError(response.errors);
      } else {
        setSuccess('Registration successful! Redirecting to login...');
  
        // Reset form after successful registration
        setFormData({
          username: '',
          firstName: '',
          lastName: '',
          password: '',
          securityQuestion: '',
          securityAnswer: '',
          active: true,
          company: { companyName: '' },
        });
  
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (err) {
      console.error('API Error:', err);
      setError(['An unexpected error occurred']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="form-wrapper">
        <h1 className="form-title">Create an Account</h1>
        <p className="form-subtitle">Register to access your dashboard</p>

        <p className="required-fields-note">
          Fields marked with <span>*</span> are required
        </p>

        {error && (
          <div className="alert error">
            <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
              {error.map((errMsg, index) => (
                <li key={index}>{errMsg}</li>
              ))}
            </ul>
          </div>
        )}

        {success && <div className="alert success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <PersonalInfoSection 
            formData={formData} 
            handleChange={handleChange} 
            validationErrors={validationErrors} 
          />

          <CompanyInfoSection 
            formData={formData} 
            handleChange={handleChange} 
            validationErrors={validationErrors} 
          />

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Processing...' : 'Create Account'}
          </button>

          <p className="signin-link">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
