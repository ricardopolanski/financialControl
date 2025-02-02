import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel"; // Import the User model

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, active = true } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, active });

    res.status(201).json(
        {   
            success: true,
            message: `User ${username} registered successfully`,
            statusCode: 201,
            data: {
                userName: `${username}`,
                userActive: `${active}`
            }
        }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(
        {
            success: false,
            message: "Server error"
        }
    );
  }
};
