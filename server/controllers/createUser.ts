import { Response, NextFunction } from "express";
import * as userRepository from '../repositories/userRepository'
import * as response from '../utils/responseHandler'
import AuthenticatedRequest from '../types/AuthenticatedRequest'
import * as userService from '../services/userService';

export const createUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
    const userData = {
        ...req.body,
        companyId: req.user?.companyId
    };

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
            const result = await userService.registerUserService(req.body);
            return response.sendSuccess(res, {
                message: `User ${result.userName} registered successfully`,
                data: result,
                
            });
            // next();
        }
    }catch (err) {
        next(err)
    }
}