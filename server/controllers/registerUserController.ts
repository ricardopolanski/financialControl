import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { Request, Response } from 'express'
import SessionToken from '../models/sessionTokenModel'
import User from '../models/userModel' // Import the User model
import { body, validationResult } from 'express-validator';
import Joi from 'joi';

// Function to generate tokens in xxxx-xxxx-xxxx-xxxx-xxxx format
const generateToken = (): string => {
  return Array(4)
    .fill(null)
    .map(() => crypto.randomBytes(2).toString('hex')) // 2 bytes = 4 hex characters
    .map((segment) => segment.padStart(5, '0')) // Ensure each segment is 5 characters long
    .join('-')
}

const registerUserSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(5)
    .max(15)
    .required()
    .messages({
      'string.alphanum': 'Username must contain only letters and numbers',
      'string.min': 'Username must be at least 5 characters',
      'string.max': 'Username must not exceed 15 characters',
      'any.required': 'Username is required',
    }),

    password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/, 'uppercase')
    .pattern(/[a-z]/, 'lowercase')
    .pattern(/[0-9]/, 'number')
    .pattern(/[@$!%*?&]/, 'special character')
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.name': 'Password must contain at least one {#name}',
      'any.required': 'Password is required',
    }),
    
    active: Joi.boolean().default(true)
})

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { error, value } = registerUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.reduce((acc, err) => {
      const key = err.path.join('.'); // Get field name
      acc[key] = err.message; // Assign error message
      return acc;
    }, {} as Record<string, string>);
  
    return res.status(400).json({ success: false, errors: errorDetails });
  }


  const { username, password, active = true, created_ts, updated_ts, last_login, last_frustated_login, frustated_login_count } = value

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } })

    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' })
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user
    const user = await User.create({
      username,
      password: hashedPassword,
      active,
      created_ts,
      updated_ts,
      last_login,
      last_frustated_login,
      frustated_login_count,
    })

    // Generate master_token and session_token
    const master_token = generateToken() // Generate token in the desired format
    const session_token = generateToken() // Generate token in the desired format

    // Create session tokens for the new user
    await SessionToken.create({
      user_id: user.id, // User ID from the newly created user
      master_token,
      session_token,
      active,
      created_ts: new Date(),
      updated_ts,
    })

    res.status(200).json({
      success: true,
      message: `User ${username} registered successfully`,
      statusCode: 200,
      data: {
        userName: username,
        userActive: active,
        masterToken: master_token, // You may want to send this back for use in the client
        sessionToken: session_token, // You may want to send this back for use in the client
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
