import {Request, Response} from 'express';
import StatusCodes from 'http-status-codes';

import UserDao from "../daos/usersDao";

const {BAD_REQUEST, CREATED, OK} = StatusCodes;
const UD = new UserDao();

export async function addOneUser(req: Request, res: Response) {
    const user = req.body;
    await UD.add(user);
    return res.status(OK).json(user).end()
}

export async function getUser(req: Request, res: Response) {
    const id= parseInt(req.params.id);
    const users = await UD.getOne(id);
    return res.status(OK).json(users).end();
}

export async function getAllUsers(req: Request, res: Response) {
    const users = await UD.getAll();
    return res.status(OK).json({userName: users});
}

export async function updateUser(req: Request, res: Response) {
    const user = req.body;
    await UD.update(user);
    return res.status(StatusCodes.ACCEPTED).end();
}

export async function deleteUser(req: Request, res: Response) {
    const {id} = req.params;
    console.log(req.params);
    await UD.delete(Number(id));
    res.status(StatusCodes.ACCEPTED).end();
}