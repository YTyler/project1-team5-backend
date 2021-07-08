"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getOneUser = exports.getUser = exports.addUser = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const usersDao_1 = __importDefault(require("../daos/usersDao"));
const { ACCEPTED, CREATED, OK } = http_status_codes_1.default;
const UD = new usersDao_1.default();
async function addUser(req, res) {
    const user = req.body;
    await UD.add(user);
    return res.status(CREATED).json(user).end();
}
exports.addUser = addUser;
async function getUser(req, res) {
    const id = parseInt(req.params.id);
    const users = await UD.getOne(id);
    return res.status(OK).json(users).end();
}
exports.getUser = getUser;
async function getOneUser(req, res) {
    const name = req.params.userName;
    const users = await UD.getOneUser(name);
    return res.status(OK).json(users).end();
}
exports.getOneUser = getOneUser;
async function getAllUsers(req, res) {
    const users = await UD.getAll();
    return res.status(OK).json(users);
}
exports.getAllUsers = getAllUsers;
async function updateUser(req, res) {
    const user = req.body;
    await UD.update(user);
    return res.status(ACCEPTED).end();
}
exports.updateUser = updateUser;
async function deleteUser(req, res) {
    const { id } = req.params;
    await UD.delete(Number(id));
    res.status(ACCEPTED).end();
}
exports.deleteUser = deleteUser;
