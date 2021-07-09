import {Request, Response} from 'express';
import StatusCodes from 'http-status-codes';
import UserDao from "../daos/usersDao";

const {ACCEPTED, CREATED, OK} = StatusCodes;
const UD = new UserDao();


export async function addUser(req: Request, res: Response) {
    const user = req.body;
    await UD.add(user);
    return res.status(CREATED).json(user).end()
}

export async function getUser(req: Request, res: Response) {
    const id= parseInt(req.params.id);
    const users = await UD.getOne(id);
    return res.status(OK).json(users).end();
}

export async function getOneUser(req: Request, res: Response) {
    const name= req.params.userName;
    const users = await UD.getOneUser(name);
    return res.status(OK).json(users).end();
}

export async function getAllUsers(req: Request, res: Response) {
    const users = await UD.getAll();
    return res.status(OK).json(users);
}

export async function updateUser(req: Request, res: Response) {
    const user = req.body;
    await UD.update(user);
    return res.status(ACCEPTED).end();
}

export async function deleteUser(req: Request, res: Response) {
    const {id} = req.params;
    await UD.delete(Number(id));
    res.status(ACCEPTED).end();
}