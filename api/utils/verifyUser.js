import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  // Check Authorization header first (Clerk token)
  const authorizationHeader = req.headers.authorization;
  
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.substring(7);
    
    try {
      // Simplified Clerk token validation
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.sub) {
        req.user = { id: decodedToken.sub };
        return next();
      }
    } catch (error) {
      return next(errorHandler(403, 'Invalid Clerk token!'));
    }
  }
  
  // Fallback: Legacy JWT cookie method
  const cookieToken = req.cookies.access_token;
  if (!cookieToken) {
    return next(errorHandler(401, 'You are not authenticated!'));
  }
  
  jwt.verify(cookieToken, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(errorHandler(403, 'Forbidden!'));
    req.user = user;
    next();
  });
};