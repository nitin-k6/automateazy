import express from 'express';
import authController from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

import authValidator from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', authValidator.validateRegister, authController.registerUser);
router.post('/login', authController.loginUser);

router.get('/me', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user).select('-password');
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user data' });
    }
  });

 
  
   
export default router;


