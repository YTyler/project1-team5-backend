"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./user");
const thread_1 = require("./thread");
// User-route
const userRouter = express_1.Router();
userRouter.get('/:id', user_1.getUser);
userRouter.get('/getUser', user_1.getAllUsers);
userRouter.post('/', user_1.addOneUser);
userRouter.put('/:id', user_1.updateUser);
userRouter.delete('/deleteUser/:id', user_1.deleteUser);
//Thread-route
const threadRouter = express_1.Router();
threadRouter.get("/:author", thread_1.getAuthor);
threadRouter.get("/id/:id", thread_1.getThread);
threadRouter.get("/all", thread_1.getAllAuthors);
threadRouter.post("/", thread_1.addThread);
threadRouter.put('/:id', thread_1.updateThread);
threadRouter.delete('/:id', thread_1.deleteThread);
// Export the base-router
const baseRouter = express_1.Router();
baseRouter.use('/user', userRouter);
baseRouter.use('/thread', threadRouter);
exports.default = baseRouter;
