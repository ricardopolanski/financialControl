import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { Sequelize } from "sequelize";
import { formatDate } from "../helpers/formatDate"

/* API Request body example:
Method: GET

{
  "username": "username",
  "password": "passwprd"
} 

Positive Response Body
{
    "message": "Login successful",
    "token": "JWS token",
    "last_login": "Weekday, Month day, YYYY at H:MM:SS AM/PM"
}

Negative Response Body Messages
{ message "Username is required" },
{ message "Password is required" },
{ message: "User not found" };
{ message: "User is inactive" };
{ message: "Password blocked. User has 3 frustrated login attempts!" };
{ message: "Wrong password" };      
{ message: "Server error" };
*/

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// User Login
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    } else if (!user.active) {
      return res.status(400).json({ message: "User is inactive", });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      await user.increment('frustated_login_count', { by: 1 });
      
      await User.update(
        { last_frustated_login: new Date() },
        { where: { username: username } }
      );      

      if (user.frustated_login_count === 3 && user.active) {
        await User.update({ active: false }, { where: { username: username } } )
        return res.status(400).json({ message: "Password blocked. User has 3 frustrated login attempts!", });
      }

      return res.status(400).json({ message: "Wrong password" });      
    } else if (user && isPasswordCorrect && user.active) {
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: "1h",
      });      

      res.status(200).json({
        message: "Login successful",
        token,
        lastLogin: formatDate(user.last_login)
      });
      await User.update( { last_login: new Date() }, { where: { username: username } } );
      if (user.frustated_login_count > 0) {
        await User.update( { frustated_login_count: 0, last_login: new Date() }, { where: { username: username } } )
      }
    }
    
  } catch (err) {
    next(err)
  }
};
