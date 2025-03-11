import { useState } from 'react';

/**
 * Custom hook for form state management
 * @param {Object} initialValues - Initial form values
 * @param {Function} validateFn - Validation function
 * @param {Function} submitFn - Form submission function
 * @returns {Object} Form state and handlers
 */
export const useForm = (initialValues, validateFn, submitFn) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    success: null,
    error: null
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateFn(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setLoading(true);
    setStatus({ success: null, error: null });
    
    try {
      const result = await submitFn(formData);
      setStatus({ 
        success: 'Form submitted successfully!', 
        error: null 
      });
      return result;
    } catch (err) {
      setStatus({ 
        success: null, 
        error: err.message 
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
    setStatus({ success: null, error: null });
  };

  return {
    formData,
    errors,
    loading,
    status,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData
  };
};

export default useForm;