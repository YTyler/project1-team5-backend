import {Request, Response} from 'express';
import StatusCodes from 'http-status-codes';
import ThreadDao from '../daos/threadDao';

const {BAD_REQUEST, CREATED, OK} = StatusCodes;
const TD = new ThreadDao();

export async function addThread(req: Request, res: Response) {
    const thread = req.body;
    await TD.add(thread);
    return res.status(CREATED).json(thread).end()
}

export async function getAuthor(req: Request, res: Response) {
    const author= (req.params.author);
    const authors = await TD.getOneAuthor(author);
    return res.status(OK).json(authors).end();
}

export async function getTitle(req: Request, res: Response) {
    const title= (req.params.title);
    const titles = await TD.getOneTitle(title);
    return res.status(OK).json(titles).end();
}

export async function getAllAuthors(req: Request, res: Response) {
    const author = await TD.getAll();
    return res.status(OK).json({author: author});
}

export async function updateThread(req: Request, res: Response) {
    const thread = req.body;
    await TD.update(thread);
    return res.status(StatusCodes.ACCEPTED).end();
}

export async function deleteThread(req: Request, res: Response) {
    const {title} = req.params;
    await TD.delete(title);
    res.status(StatusCodes.ACCEPTED).end();
}