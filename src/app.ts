import express from 'express';
import BaseRouter from './routes/index';
import cors from 'cors'



//configure express app
const app = express();

app.use(cors())
app.use(express.json())
app.use('/', BaseRouter);

export default app
