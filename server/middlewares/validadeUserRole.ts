import { Request, Response, NextFunction } from 'express'
import * as userRolesRepository from '../repositories/userRolesRepository'
import { userRoles } from '../constants'
import * as response from '../utils/responseHandler'


export const validateUserRole = async(req: any, res: Response, next: NextFunction): Promise<any> => {
    if (req.user.roleId != userRoles.ADMIN.ID) {
        return response.sendUnauthorizedError(res, {
            success: false,    
            message: 'Unauthorized.'
        })
    }
    next();
}