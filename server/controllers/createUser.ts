import { Request, Response, NextFunction } from "express";
import * as userRepository from '../repositories/userRepository'
import * as response from '../utils/responseHandler'
import { validationResult } from 'express-validator'
import AuthenticatedRequest from '../types/AuthenticatedRequest'

export const createUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
    const userData = {
        ...req.body,
        companyId: req.user?.companyId
    };

    const errors = validationResult(req)
      if (!errors.isEmpty()) {
        response.sendValidationError(res, {
          success: false,
          errors: errors.array().map((err) => ({ message: err.msg }))
        })
      }

    try {
        const user = await userRepository.findUserByUsername(userData.username);

        if (user) { 
            if (user.active === false) {
                return response.sendValidationError(res, {
                    success: false,
                    error: 'User is inactive.'
                })  
            } else {
                return response.sendValidationError(res, {
                    success: false,
                    error: 'User already is taken'
                })
            } 
        } else {
            req.body = userData;
            next();
        }
    }catch (err) {
        next(err)
    }
}