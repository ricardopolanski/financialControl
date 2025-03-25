import { body, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import * as response from '../utils/responseHandler';


export const validateUser: (ValidationChain | ((req: Request, res: Response, next: NextFunction) => void))[] = [
  body('username')
    .isLowercase().withMessage('Unsername must contain lowercase')
    .isLength({ min: 5, max: 15 }).withMessage('Username must be between 5 and 15 characters')
    .matches(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/)
    .withMessage('Username must contain at least one letter and one number')
    .notEmpty().withMessage('Username is required'),

  body('firstName')
    .isAlpha().withMessage('First name must contain only letters')
    .notEmpty().withMessage('First name is required'),

  body('lastName')
    .isAlpha().withMessage('Last name must contain only letters')
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
      return response.sendValidationError(res, {
        success: false,
        errors: errors.array().map((err) => ({ message: err.msg }))
      })
    }
    next(); // No errors, move to the next middleware/controller
  }
];
