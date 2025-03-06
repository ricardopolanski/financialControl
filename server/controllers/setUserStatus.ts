import { Request, Response, NextFunction } from "express";
import * as userServices from '../services/userService'


export const setUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
  const { username, active }: { username: string; active: boolean } = req.body;
    const setUserStatus = true
  try {
    const userStatus = active === true ? "Active" : "Inactive"
    const user = await userServices.findUserService({username})

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.active === active) {
      return res.status(200).json({
        message: `User ${username} is already ${userStatus}`
      });
    }

    await userServices.updateUserService({ username, setUserStatus, active })
    
    res.status(200).json({
            message: `User ${username} is ${userStatus}`
          });
  } catch (err) {
    next(err)
  }
};
