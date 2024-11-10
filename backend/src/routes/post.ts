import express, { Request, Response } from 'express';
import { Todo } from '../db';

const router = express.Router();

router.post('/post', async (req: Request, res: Response) => {
    try {
        const newTask = req.body;
        const todo = await Todo.findOne(newTask);
        
        if(todo){
            res.status(401).json({
                msg: 'task already present',
            })
        };

        const newTodo = new Todo(newTask);
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
});

export default router;