// CompanyInfoSection.jsx
import React from 'react';
import FormField from './FormField';

const CompanyInfoSection = ({ formData, handleChange, validationErrors }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Company Information</h3>
      
      <FormField
        label="Company Name"
        name="company.companyName"
        type="text"
        value={formData.company.companyName}
        onChange={handleChange}
        error={validationErrors['company.companyName']}
        isRequired={true}
      />
    </div>
  );
};

export default CompanyInfoSection;
