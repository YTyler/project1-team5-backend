"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.getPost = exports.getAuthorPost = exports.addPost = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const postDao_1 = __importDefault(require("../daos/postDao"));
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
const PD = new postDao_1.default();
async function addPost(req, res) {
    const post = req.body;
    await PD.add(post);
    return res.status(CREATED).json(post).end();
}
exports.addPost = addPost;
async function getAuthorPost(req, res) {
    const author = (req.params.author);
    const authors = await PD.getOneAuthor(author);
    return res.status(OK).json(authors).end();
}
exports.getAuthorPost = getAuthorPost;
async function getPost(req, res) {
    const id = parseInt(req.params.id);
    const titles = await PD.getOnePost(id);
    return res.status(OK).json(titles).end();
}
exports.getPost = getPost;
// export async function getAllPosts(req: Request, res: Response) {
//     return res.status(200).json(await PD.getAllPosts());
// }
// export async function updatePost(req: Request, res: Response) {
//     const author = req.params.author;
//     console.log(author);
//     await PD.update(author);
//     return res.status(StatusCodes.ACCEPTED).end();
// }
async function deletePost(req, res) {
    const { id } = req.params;
    await PD.delete(Number(id));
    res.status(http_status_codes_1.default.ACCEPTED).end();
}
exports.deletePost = deletePost;
