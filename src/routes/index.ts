import { Router } from 'express';
import {addOneUser, getAllUsers, getUser, updateUser, deleteUser} from "./user"
import {addThread, getAllAuthors, getAuthor, getThread, deleteThread} from "./thread";
import {addPost, getAllPosts, getAuthorPost, getPost, deletePost} from "./post";



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
threadRouter.get("/id/:id", getThread);
threadRouter.get("/all", getAllAuthors);
threadRouter.post("/", addThread);
// threadRouter.put('/:id', updateThread);
threadRouter.delete('/:id', deleteThread);

//Post-route
const postRouter = Router();
postRouter.get("/:author", getAuthorPost);
postRouter.get("/id/:id", getPost);
postRouter.get("/all", getAllPosts);
postRouter.post("/", addPost);
// postRouter.put('/:author', updatePost);
postRouter.delete('/:id', deletePost);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/user', userRouter);
baseRouter.use('/thread', threadRouter);
baseRouter.use('/post', postRouter);
export default baseRouter;
