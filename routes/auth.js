import express from 'express';
import { 
    registerController,
    loginController
} from '../controllers/authControllers.js';

const router = express.Router();

// Register route - POST /register
router.post('/register', registerController);

// Login route - POST /login
router.post('/login', loginController);

export default router;