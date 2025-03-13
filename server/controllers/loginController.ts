import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { formatDate } from "../helpers/formatDate"
import * as userServices from '../services/userService'
import * as loginServices from '../services/loginServices'
import * as response from '../utils/responseHandler'

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

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// User Login
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { username, password } = req.body;

  try {
    const user = await userServices.findUserService({ username })

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    } else if (!user.dataValues.active) {
      return res.status(400).json({ message: "User is inactive", });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.dataValues.password);

    if (!isPasswordCorrect) {   
      await userServices.updateUserService({username, frustated_login: true})

      if (user.frustated_login_count === 3 && user.active) {
        await userServices.updateUserService({ username, blockkUser: true })
        return res.status(400).json({ message: "Password blocked. User has 3 frustrated login attempts!", });
      }

      return res.status(400).json({ message: "Wrong password" });      
    } else if (user && isPasswordCorrect && user.dataValues.active) {    
      const token = await loginServices.generateJWT({ id: user.dataValues.id, username: user.dataValues.username})

      response.sendSuccess(res, {
        message: "Login successful",
        token,
        lastLogin: formatDate(user.dataValues.last_login)
      });

      await User.update( { last_login: new Date() }, { where: { username: username } } );
      if (user.dataValues.frustated_login_count > 0) {
        await User.update( { frustated_login_count: 0, last_login: new Date() }, { where: { username: username } } )
      }
    }
  } catch (err) {
    next(err)
  }
};
