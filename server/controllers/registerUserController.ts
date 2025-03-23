import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { registerUserService } from '../services/userService'
import { registerUserWithCompany } from '../services/userCompanyService'
import { userRoles } from '../constants'
import sequelize from '../config/db'
import * as response from '../utils/responseHandler'
import { Transaction } from 'sequelize'

 export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  console.log('REAL CONTROLLER CALLED!', req.body);
  try {
    const result = await registerUserWithCompany(req.body);
    
    return response.sendSuccess(res, {
      message: `User ${result.user.userName} registered successfully`,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
// }

