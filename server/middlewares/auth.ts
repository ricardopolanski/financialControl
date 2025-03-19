import { Response, Request, NextFunction } from "express";
import * as response from '../utils/responseHandler'
import * as authService from '../services/loginServices'
import AuthenticatedRequest from "../types/AuthenticatedRequest";


export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return response.sendUnauthorizedError(res, { message: 'No token provided.' });
  }
  
  try {
    // Authentication should be handled by a service
    const decoded = await authService.verifyToken(token);
    
    // Set user data in request for downstream use
    req.user = decoded;
    next();
  } catch (error) {
    return response.sendUnauthorizedError(res, { message: 'Invalid token.' });
  }
};
