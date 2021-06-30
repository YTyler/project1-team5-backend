"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUser = exports.addOneUser = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const usersDao_1 = __importDefault(require("../daos/usersDao"));
// import {UsersInter} from "../entities/usersModel";
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
const UD = new usersDao_1.default();
async function addOneUser(req, res) {
    const user = req.body;
    await UD.add(user);
    return res.status(OK).json(user).end();
}
exports.addOneUser = addOneUser;
async function getUser(req, res) {
    const id = parseInt(req.params.id);
    const users = await UD.getOne(id);
    return res.status(OK).json(users).end();
}
exports.getUser = getUser;
async function getAllUsers(req, res) {
    const users = await UD.getAll();
    return res.status(OK).json({ userName: users });
}
exports.getAllUsers = getAllUsers;
async function updateUser(req, res) {
    const user = req.body;
    await UD.update(user);
    return res.status(http_status_codes_1.default.ACCEPTED).end();
}
exports.updateUser = updateUser;
async function deleteUser(req, res) {
    const { id } = req.params;
    console.log(req.params);
    await UD.delete(Number(id));
    res.status(http_status_codes_1.default.ACCEPTED).end();
}
exports.deleteUser = deleteUser;
