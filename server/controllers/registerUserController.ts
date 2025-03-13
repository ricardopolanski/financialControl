import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { registerUserService } from '../services/userService'
import { registerCompanyService } from '../services/companyServices'
import sequelize from '../config/db'
import * as response from '../utils/responseHandler'

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // Handle validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    response.sendValidationError(res, {
      success: false,
      errors: errors.array().map((err) => ({ message: err.msg }))
    })
  }

  const transaction = await sequelize.transaction();

  try {
    const { company, ...userData } = req.body;
    
    const companyData = await registerCompanyService(company, { transaction });
    
    if (companyData.companyId) {
      const role_id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
      const user = await registerUserService({ ...userData, roleId: role_id, companyId: companyData.companyId }, { transaction });
      await transaction.commit();

      response.sendSuccess(res, {
        message: `User ${user.userName} registered successfully`,
        data: user,
        company: companyData
      })
    }
    
  } catch (err) {
    await transaction.rollback();
    const error =  err as Error;
    if (error.message === "Username already taken" || error.message === "Company already exist") {
      response.sendValidationError(res, {
        success: false,
        errors: error.message
      })
    }
    next(err); // Pass unexpected errors to middleware
  }
}
