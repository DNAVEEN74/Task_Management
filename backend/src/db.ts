import mongoose, { Document, Model, Schema } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DB_URL || '';

interface ITodo extends Document {
    title: string;
    description?: string;
    deadline: Date;
    priority: 'low' | 'medium' | 'high';
    state: 'todos' | 'onProgress' | 'completed';
}

const todoSchema = new Schema<ITodo>({
    title: { type: String, required: true },
    description: { type: String, required: false },
    deadline: { type: Date, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    state: { type: String, enum: ['todos', 'onProgress', 'completed'], required: true },
});

const Todo: Model<ITodo> = mongoose.model<ITodo>('Todo', todoSchema);

export { Todo, ITodo };

export default async function connectDB() {
    try {
        await mongoose.connect(dbUrl);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}