import { Request } from 'express';

export default interface AuthenticatedRequest extends Request {
  user?: { 
    userId?: string;
    username?: string;
    companyId?: string;
    roleId?: string;
    token?: string
  };
}