import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { registerUserService } from '../services/userService'
import { registerCompanyService } from '../services/companyServices'
import sequelize from '../config/db'

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // Handle validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({ message: err.msg }))
    });
  }

  const transaction = await sequelize.transaction();

  try {
    const { company, ...userData } = req.body;
    
    const companyData = await registerCompanyService(company, { transaction });
    
    if (companyData.companyId) {
      const user = await registerUserService({ ...userData, companyId: companyData.companyId }, { transaction });
      await transaction.commit();
      res.status(201).json({
        success: true,
        message: `User ${user.userName} registered successfully`,
        statusCode: 201,
        data: user,
        company: companyData
      })
    }
    
  } catch (err) {
    await transaction.rollback();
    const error =  err as Error;
    if (error.message === "Username already taken" || error.message === "Company already exist") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    next(err); // Pass unexpected errors to middleware
  }
}
