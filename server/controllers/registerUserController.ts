import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { registerUserService } from '../services/userService'
import { registerCompanyService } from '../services/companyServices'
import { userRoles } from '../constants'
import sequelize from '../config/db'
import * as response from '../utils/responseHandler'
import { Transaction } from 'sequelize'

const createUser = async(req: Request, res: Response, transaction: Transaction,  companyData?: any) => {
  const user = await registerUserService(req, { transaction });
  
  await transaction.commit();

  response.sendSuccess(res, {
    message: `User ${user.userName} registered successfully`,
    data: user,
    company: companyData
  })
}

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
    const role_id = req.body.roleId ? req.body.roleId : userRoles.ADMIN.ID;
    
    if (!req.body.companyId) {
      const companyData = await registerCompanyService(company, { transaction });

      if (companyData.companyId) {
        createUser({ ...userData, roleId: role_id, companyId: companyData.companyId }, res, transaction, { companyData })
      }
    } else {
      createUser({ ...userData, roleId: role_id, companyId: req.body.companyId }, res, transaction);
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
