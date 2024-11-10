import express, { Request, Response } from 'express';
import { Todo, ITodo } from '../db';

const router = express.Router();

router.put('/todo', async (req: Request, res: Response) => {
    try {
        const { id: currentState, state: newState, title } = req.body;
        
        const todo = await Todo.findOne({ state: currentState, title }) as ITodo | null;

        if (todo) {
            todo.state = newState;
            await todo.save();

            res.status(200).json(todo);
        } else {
            res.status(404).json({ message: 'Todo not found with the specified state and title' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo', error });
    }
});

export default router;