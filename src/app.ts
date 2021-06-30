import express from 'express';
import BaseRouter from './routes/index';

//configure express
const app = express();
app.use(express.json())
app.use('/', BaseRouter);

//Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});