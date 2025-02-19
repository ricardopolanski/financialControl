import { body, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


export const validateUser: (ValidationChain | ((req: Request, res: Response, next: NextFunction) => void))[] = [
  body('username')
    .isAlphanumeric().withMessage('Username must contain only letters and numbers')
    .isLength({ min: 5, max: 15 }).withMessage('Username must be between 5 and 15 characters')
    .notEmpty().withMessage('Username is required'),

  body('firstName')
    .isAlphanumeric().withMessage('First name must contain only letters')
    .notEmpty().withMessage('First name is required'),

  body('lastName')
    .isAlphanumeric().withMessage('Last name must contain only letters')
    .notEmpty().withMessage('Last name is required'),

  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character')
    .notEmpty().withMessage('Password is required'),

  body('securityQuestion')
    .matches(/^[a-zA-Z0-9\s!?.,;:'"-]*$/).withMessage('Security question must contain only letters')
    .notEmpty().withMessage('Security question is required'),

  body('securityAnsware')
    .matches(/^[a-zA-Z0-9\s!?.,;:'"-]*$/).withMessage('Security answer must contain only letters')
    .notEmpty().withMessage('Security answer is required'),

  body('active').optional().isBoolean().withMessage('Active must be a boolean value'),

  // Validation error handling middleware
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({ message: err.msg }))
      });
    }
    next(); // No errors, move to the next middleware/controller
  }
];