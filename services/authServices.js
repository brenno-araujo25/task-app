import jwt from 'jsonwebtoken';
import db from '../models/index.js';

export const registerService = async (name, email, password) => {
    try {
        const userExists = await db.User.findOne({ where: { email } });
        if (userExists) {
            throw new Error('Email already in use');
        }

        const user = await db.User.create({ name, email, password });

        return { 
            message: 'User created successfully',
            user
        };
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

export const loginService = async (email, password) => {
    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await user.validPassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const payload = {
            id: user.id,
            email: user.email,
            name: user.name
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { 
            message: 'User logged in successfully',
            token
        };
    } catch (error) {
        throw new Error('Error logging user: ' + error.message);
    }
};