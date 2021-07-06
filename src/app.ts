import express from 'express';
import BaseRouter from './routes/index';

//configure express app
const app = express();
app.use(express.json())
app.use('/', BaseRouter);

export default app