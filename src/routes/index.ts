import { Router } from 'express';
import {addUser, getAllUsers, getUser, updateUser, deleteUser} from "./user"
import {addThread, getAllAuthors, getAuthor, getThread, updateThread, deleteThread} from "./thread";
import {addPost, getAllAuthorsPost, getAuthorPost, getPost, updatePost, deletePost} from "./post";


// User-route
const userRouter = Router();
userRouter.get('/:id', getUser);
userRouter.get('/all', getAllUsers)
userRouter.post('/', addUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

//Thread-route
const threadRouter = Router();
threadRouter.get("/:author", getAuthor);
threadRouter.get("/id/:id", getThread);
threadRouter.get("/all", getAllAuthors);
threadRouter.post("/", addThread);
threadRouter.put('/:id', updateThread);
threadRouter.delete('/:id', deleteThread);

//Post-route
const postRouter = Router();
threadRouter.get("/:author", getAuthorPost);
threadRouter.get("/id/:id", getPost);
threadRouter.get("/all", getAllAuthorsPost);
threadRouter.post("/", addPost);
threadRouter.put('/:id', updatePost);
threadRouter.delete('/:id', deletePost);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/user', userRouter);
baseRouter.use('/thread', threadRouter);
baseRouter.use('/post', postRouter);
export default baseRouter;
