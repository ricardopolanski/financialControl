import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import SessionToken from '../models/sessionTokenModel'
import User from '../models/userModel' // Import the User model

// Function to generate tokens in xxxx-xxxx-xxxx-xxxx-xxxx format
const generateToken = (): string => {
  return Array(4)
    .fill(null)
    .map(() => crypto.randomBytes(2).toString('hex')) // 2 bytes = 4 hex characters
    .map((segment) => segment.padStart(5, '0')) // Ensure each segment is 5 characters long
    .join('-')
}

// ✅ Validation Middleware
export const validateUser = [
  body('username')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers')
    .isLength({ min: 5, max: 15 })
    .withMessage('Username must be between 5 and 15 characters')
    .notEmpty()
    .withMessage('Username is required'),

  body('first_name')
    .isAlphanumeric()
    .withMessage('First name must contain only letters')
    .notEmpty()
    .withMessage('First name is required'),

  body('last_name')
    .isAlphanumeric()
    .withMessage('Last name must contain only letters')
    .notEmpty()
    .withMessage('Last name is required'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&]/)
    .withMessage('Password must contain at least one special character')
    .notEmpty()
    .withMessage('Password is required'),

  body('security_question')
    .matches(/^[a-zA-Z0-9\s!?.,;:'"-]*$/)
    .withMessage('Security question must contain only letters')
    .notEmpty()
    .withMessage('Security question is required'),

  body('security_answare')
    .matches(/^[a-zA-Z0-9\s!?.,;:'"-]*$/)
    .withMessage('Security answare must contain only letters')
    .notEmpty()
    .withMessage('Security answare is required'),

  body('active').optional().isBoolean().withMessage('Active must be a boolean value'),
]

// ✅ Updated Register Function
export const registerUser = async (req: Request, res: Response): Promise<any> => {
  // Handle validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({ message: err.msg }))
    })
  }

  const {
    username,
    first_name,
    last_name,
    password,
    active = true,
    created_ts,
    updated_ts,
    last_login,
    last_frustated_login,
    frustated_login_count,
    security_question,
    security_answare
  } = req.body

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } })
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already taken' })
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user
    const user = await User.create({
      username,
      first_name,
      last_name,
      password: hashedPassword,
      active,
      created_ts,
      updated_ts,
      last_login,
      last_frustated_login,
      frustated_login_count,
      security_question,
      security_answare
    })

    // Generate master_token and session_token
    const master_token = generateToken()
    const session_token = generateToken()

    // Create session tokens for the new user
    await SessionToken.create({
      user_id: user.id,
      master_token,
      session_token,
      active,
      created_ts: new Date(),
      updated_ts,
    })

    res.status(201).json({
      success: true,
      message: `User ${username} registered successfully`,
      statusCode: 200,
      data: {
        userName: username,
        userActive: active,
        masterToken: master_token,
        sessionToken: session_token,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}
