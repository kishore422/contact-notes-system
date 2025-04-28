import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    if (username === 'admin' && password === 'password123') {
      const payload = { userId: '12345', username };
      const secretKey = config.jwtSecret || 'default_secret';
      
      const token = jwt.sign(payload, secretKey);

      res.status(200).json({
        message: 'Authentication successful',
        token,
        expiresIn: config.jwtExpiresIn
      });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};