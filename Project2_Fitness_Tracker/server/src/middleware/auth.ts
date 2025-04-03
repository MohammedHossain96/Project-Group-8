import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the interface for the JWT payload
interface JwtPayload {
  username: string;
  id: number;
}

// Middleware function to authenticate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;
  
  console.log('Auth header:', authHeader ? 'Present' : 'Missing');

  // Check if the authorization header is present
  if (authHeader) {
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];
    
    // Get the secret key from the environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';
    
    if (!secretKey) {
      console.error('JWT_SECRET_KEY is not defined in environment variables');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // Verify the JWT token
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error('JWT verification error:', err.message);
        return res.status(403).json({ message: 'Token verification failed' });
      }

      console.log('Decoded token user:', user);
      
      // Attach the user information to the request object
      req.user = user as JwtPayload;
      return next(); // Call the next middleware function
    });
    
    // This handles the case where jwt.verify is running asynchronously
    return;
  } else {
    console.error('No authorization header present');
    return res.status(401).json({ message: 'Authorization header missing' });
  }
};
