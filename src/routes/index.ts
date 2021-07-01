import { Router } from 'express';
import {addUser, getAllUsers, getUser, updateUser, deleteUser} from "./user"


// User-route
const userRouter = Router();
userRouter.get('/:id', getUser);
userRouter.get('/all', getAllUsers)
userRouter.post('/', addUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/user', userRouter);
export default baseRouter;
