// FormField.jsx
import React from 'react';

const FormField = ({ label, name, type, value, onChange, error, className = '', isRequired = false }) => {
  return (
    <div className="form-field-container">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`appearance-none block w-full px-3 py-2 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      </div>
      {error && (
        <p 
          id={`${name}-error`} 
          className="error-message text-red-600 text-sm mt-1 font-medium"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
