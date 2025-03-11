// PersonalInfoSection.jsx
import React from 'react';
import FormField from './FormField';

const PersonalInfoSection = ({ formData, handleChange, validationErrors }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Personal Information</h3>
      
      <FormField
        label="Username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        error={validationErrors.username}
        isRequired={true}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="First Name"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          error={validationErrors.firstName}
          isRequired={true}
        />
        
        <FormField
          label="Last Name"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          error={validationErrors.lastName}
          isRequired={true}
        />
      </div>
      
      <FormField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={validationErrors.password}
        isRequired={true}
      />
      
      <FormField
        label="Security Question"
        name="securityQuestion"
        type="text"
        value={formData.securityQuestion}
        onChange={handleChange}
        error={validationErrors.securityQuestion}
        isRequired={true}
      />
      
      <FormField
        label="Security Answer"
        name="securityAnsware"
        type="text"
        value={formData.securityAnsware}
        onChange={handleChange}
        error={validationErrors.securityAnsware}
        isRequired={true}
      />
    </div>
  );
};

export default PersonalInfoSection;
