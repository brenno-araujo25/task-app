import express from 'express';
import db from './models/index.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return db.sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });