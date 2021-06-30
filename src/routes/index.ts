import { Router } from 'express';
import {addOneUser, getAllUsers, getUser, updateUser, deleteUser} from "./user"


// User-route
const userRouter = Router();
userRouter.get('/user/:id', getUser);
userRouter.get('/getUser', getAllUsers )
userRouter.post('/add', addOneUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/deleteUser/:id', deleteUser);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/', userRouter);
export default baseRouter;
