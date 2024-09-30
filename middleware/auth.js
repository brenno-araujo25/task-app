import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
    if (!req.header('Authorization')) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token is not valid' });
    }
};