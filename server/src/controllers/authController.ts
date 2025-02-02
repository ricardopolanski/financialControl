// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel'; // Import the User model

// // User Registration
// export const registerUser = async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ where: { username } });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Username already taken' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({ username, password: hashedPassword });

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // User Login
// export const loginUser = async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { username } });

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);

//     if (!isPasswordCorrect) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, {
//       expiresIn: '1h',
//     });

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
