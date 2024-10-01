import { 
    registerService,
    loginService
} from '../services/authServices.js';

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerService(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginService(email, password);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};