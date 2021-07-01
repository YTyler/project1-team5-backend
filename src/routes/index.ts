import { Router } from 'express';
import {addOneUser, getAllUsers, getUser, updateUser, deleteUser} from "./user"
import {addThread, getAllAuthors, getAuthor, getThread, updateThread, deleteThread} from "./thread"


// User-route
const userRouter = Router();
userRouter.get('/:id', getUser);
userRouter.get('/getUser', getAllUsers )
userRouter.post('/', addOneUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/deleteUser/:id', deleteUser);

//Thread-route
const threadRouter = Router();
threadRouter.get("/:author", getAuthor);
threadRouter.get("/:id", getThread);
threadRouter.get("/all", getAllAuthors);
threadRouter.post("/", addThread);
threadRouter.put('/:id', updateThread);
threadRouter.delete('/:id', deleteThread);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/user', userRouter);
baseRouter.use('/thread', threadRouter)
export default baseRouter;
