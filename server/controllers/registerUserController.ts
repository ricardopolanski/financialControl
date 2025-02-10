import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { Request, Response } from 'express'
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

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { username, password, active = true, created_ts, updated_ts } = req.body

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
