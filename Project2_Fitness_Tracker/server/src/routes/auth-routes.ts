import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

// Login function to authenticate a user
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;  // Extract username and password from request body

  // Find the user in the database by username
  const user = await User.findOne({
    where: { username },
  });

  // If user is not found, send an authentication failed response
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the stored hashed password
  const passwordIsValid = await bcrypt.compare(password, user.password);
  // If password is invalid, send an authentication failed response
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user, including the user ID
  const token = jwt.sign({ username, id: user.id }, secretKey, { expiresIn: '1h' });
  return res.json({ token });  // Send the token as a JSON response
};

// Register function to create a new user
export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    // Generate a JWT token for the new user, including the user ID
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username: newUser.username, id: newUser.id }, secretKey, { expiresIn: '1h' });

    return res.status(201).json({ token });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Failed to create user' });
  }
};

// Create a new router instance
const router = Router();

// POST /login - Login a user
router.post('/login', login);  // Define the login route

// POST /register - Register a new user
router.post('/register', register);

export default router;  // Export the router instance
