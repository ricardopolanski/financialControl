export const validateForm = (data) => {
    const errors = {};
    
    if (!data.username) {
      errors.username = 'Username is required';
    } else if (data.username.length < 4) {
      errors.username = 'Username must be at least 4 characters';
    }
    
    if (!data.firstName) {
      errors.firstName = 'First name is required';
    }
    
    if (!data.lastName) {
      errors.lastName = 'Last name is required';
    }
    
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!data.securityQuestion) {
      errors.securityQuestion = 'Security question is required';
    }
    
    if (!data.securityAnsware) {
      errors.securityAnsware = 'Security answer is required';
    }
    
    if (!data.company.companyName) {
      errors['company.companyName'] = 'Company name is required';
    }
    
    return errors;
  };

  export const validateLoginForm = (data) => {
    const errors = {};
    
    if (!data.username) {
      errors.username = 'Username is required';
    }
    
    if (!data.password) {
      errors.password = 'Password is required';
    }
    
    return errors;
  };