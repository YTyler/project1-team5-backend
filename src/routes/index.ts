import { Router } from 'express';
import {addUser, getAllUsers, getUser, updateUser, deleteUser} from "./user"
import {addThread, getAllAuthors, getAuthor, getThread, deleteThread} from "./thread";
import {addPost, getAuthorPost, getPost, deletePost} from "./post";


// User-route
const userRouter = Router();
userRouter.get('/id/:id', getUser);
userRouter.get('/all', getAllUsers)
userRouter.post('/', addUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

//Thread-route
const threadRouter = Router();
threadRouter.get("/author/:author", getAuthor);
threadRouter.get("/id/:id", getThread);
threadRouter.get("/all", getAllAuthors);
threadRouter.post("/", addThread);
// threadRouter.put('/:id', updateThread);
threadRouter.delete('/:id', deleteThread);

//Post-route
const postRouter = Router();
postRouter.get("/:author", getAuthorPost);
postRouter.get("/id/:id", getPost);
//postRouter.get("/all", getAllPosts);
postRouter.post("/", addPost);
// postRouter.put('/:author', updatePost);
postRouter.delete('/:id', deletePost);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/user', userRouter);
baseRouter.use('/thread', threadRouter);
baseRouter.use('/post', postRouter);
export default baseRouter;
