import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const router = express.Router();

// Register route - POST /register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await db.User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const user = await db.User.create({ name, email, password });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login route - POST /login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await user.validPassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const payload = {
            id: user.id,
            email: user.email,
            username: user.username
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({token});
    } catch (error) {
        return res.status(500).json({ error: 'Server error logging user: ', error });
    }
});

export default router;