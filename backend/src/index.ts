import express from 'express';
import cors from 'cors';
import connectDb from './db';
import todosRouter from './routes/get';
import updateRouter from './routes/update';
import postRouter from './routes/post';
import deleteRouter from './routes/delete';

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://task-management-q8x7.vercel.app'];

const corsOptions = {
    origin: (origin:any , callback: any) => {
        if(!origin) return callback(null, true);

        if(allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
}

app.options('*', cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json());

connectDb();

app.use('/', todosRouter);
app.use(updateRouter);
app.use(postRouter);
app.use(deleteRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});