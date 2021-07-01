"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./user");
// User-route
const userRouter = express_1.Router();
userRouter.get('/user/:id', user_1.getUser);
userRouter.get('/getUser', user_1.getAllUsers);
userRouter.post('/add', user_1.addOneUser);
userRouter.put('/:id', user_1.updateUser);
userRouter.delete('/deleteUser/:id', user_1.deleteUser);
// Export the base-router
const baseRouter = express_1.Router();
baseRouter.use('/', userRouter);
exports.default = baseRouter;
