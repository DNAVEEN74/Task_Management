import express, { Request, Response } from 'express';
import { Todo } from '../db';

const router = express.Router();

router.delete('/todo/:title', async (req: Request, res: Response) => {
    try {
        const { title } = req.params;
        const result = await Todo.deleteOne({ title });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Todo deleted successfully' });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error });
    }
});

export default router;