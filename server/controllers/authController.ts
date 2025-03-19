import { Request, Response, NextFunction } from 'express';
import * as response from '../utils/responseHandler'
import * as userRepository from '../repositories/userRepository'
import AuthenticatedRequest from '../types/AuthenticatedRequest'
import * as loginServices from '../services/loginServices'

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
  const token = req.headers.authorization?.split(' ')[1]; // Expect "Bearer <token>"
  
  if (!token) {
    response.sendUnauthorizedError(res, {
      message: 'Access denied. No token provided.'
    })
    return;
  }
  
  try {

    const userSession = await loginServices.verifyToken({ token, SECRET_KEY });

    const user = await userRepository.findUserById(userSession.id);

    if (!user) {
      return response.sendNotFoundError(res, {
        message: 'User not found.'
      })
    }
    
    req.user = { 
      userId: userSession.id,
      username: userSession.username,
      companyId: user.companyId,
      roleId: user.roleId
    };
    next();
  } catch (error) {
    response.sendUnauthorizedError(res, {
      message: 'Invalid or expired token.'
    })
    return; // Add return statement here
  }
};