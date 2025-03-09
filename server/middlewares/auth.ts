import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Define a custom interface that extends Express Request
interface AuthenticatedRequest extends Request {
  user?: { id: number }; // Adding 'user' property
}

export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expect "Bearer <token>"
  
  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return; // Add return statement here
  }
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };
    req.user = { id: decoded.userId }; // Attach user info to request
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token.' });
    return; // Add return statement here
  }
};