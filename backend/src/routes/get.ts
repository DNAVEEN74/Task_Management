import express, { Request, Response } from 'express';
import { Todo } from '../db';

const router = express.Router();

router.get('/get', async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Server error. Could not retrieve todos.' });
    }
});

export default router;