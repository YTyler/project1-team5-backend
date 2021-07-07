import {Request, Response} from 'express';
import StatusCodes from 'http-status-codes';
import PostDao from '../daos/postDao';

const {BAD_REQUEST, CREATED, OK} = StatusCodes;
const PD = new PostDao();

export async function addPost(req: Request, res: Response) {
    const post = req.body;
    await PD.add(post);
    return res.status(CREATED).json(post).end()
}

export async function getAuthorPost(req: Request, res: Response) {
    const author= (req.params.author);
    const authors = await PD.getOneAuthor(author);
    return res.status(OK).json(authors).end();
}

export async function getPost(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const titles = await PD.getOnePost(id);
    return res.status(OK).json(titles).end();
}

// export async function getAllPosts(req: Request, res: Response) {
//     return res.status(200).json(await PD.getAllPosts());
// }

// export async function updatePost(req: Request, res: Response) {
//     const author = req.params.author;
//     console.log(author);
//     await PD.update(author);
//     return res.status(StatusCodes.ACCEPTED).end();
// }

export async function deletePost(req: Request, res: Response) {
    const {id} = req.params;
    await PD.delete(Number(id));
    res.status(StatusCodes.ACCEPTED).end();
}