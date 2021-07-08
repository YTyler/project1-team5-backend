"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./user");
const thread_1 = require("./thread");
const post_1 = require("./post");
// User-route
const userRouter = express_1.Router();
userRouter.get('/id/:id', user_1.getUser);
userRouter.get('/name/:userName', user_1.getOneUser);
userRouter.get('/all', user_1.getAllUsers);
userRouter.post('/', user_1.addUser);
userRouter.put('/:id', user_1.updateUser);
userRouter.delete('/:id', user_1.deleteUser);
//Thread-route
const threadRouter = express_1.Router();
threadRouter.get("/author/:author", thread_1.getAuthor);
threadRouter.get("/id/:id", thread_1.getThread);
threadRouter.get("/all", thread_1.getAllAuthors);
threadRouter.post("/", thread_1.addThread);
// threadRouter.put('/:id', updateThread);
threadRouter.delete('/:id', thread_1.deleteThread);
//Post-route
const postRouter = express_1.Router();
postRouter.get("/:author", post_1.getAuthorPost);
postRouter.get("/id/:id", post_1.getPost);
//postRouter.get("/all", getAllPosts);
postRouter.post("/", post_1.addPost);
// postRouter.put('/:author', updatePost);
postRouter.delete('/:id', post_1.deletePost);
// Export the base-router
const baseRouter = express_1.Router();
baseRouter.use('/user', userRouter);
baseRouter.use('/thread', threadRouter);
baseRouter.use('/post', postRouter);
exports.default = baseRouter;
