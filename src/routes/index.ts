import { Router } from 'express';
import {addOneUser, getAllUsers, getUser, updateUser, deleteUser} from "./user"


// User-route
const userRouter = Router();
userRouter.get('/:id', getUser);
userRouter.get('/getUser', getAllUsers )
userRouter.post('/', addOneUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/deleteUser/:id', deleteUser);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/user', userRouter);
export default baseRouter;
