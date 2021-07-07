"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteThread = exports.getAllAuthors = exports.getThread = exports.getAuthor = exports.addThread = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const threadDao_1 = __importDefault(require("../daos/threadDao"));
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
const TD = new threadDao_1.default();
async function addThread(req, res) {
    const thread = req.body;
    await TD.add(thread);
    return res.status(CREATED).json(thread).end();
}
exports.addThread = addThread;
async function getAuthor(req, res) {
    const author = (req.params.author);
    const authors = await TD.getOneAuthor(author);
    return res.status(OK).json(authors).end();
}
exports.getAuthor = getAuthor;
async function getThread(req, res) {
    const id = parseInt(req.params.id);
    const titles = await TD.getOneThread(id);
    return res.status(OK).json(titles).end();
}
exports.getThread = getThread;
async function getAllAuthors(req, res) {
    const author = await TD.getAll();
    return res.status(OK).json({ author: author });
}
exports.getAllAuthors = getAllAuthors;
// export async function updateThread(req: Request, res: Response) {
//     const thread = req.body;
//     await TD.update(thread);
//     return res.status(StatusCodes.ACCEPTED).end();
// }
async function deleteThread(req, res) {
    const { id } = req.params;
    await TD.delete(Number(id));
    res.status(http_status_codes_1.default.ACCEPTED).end();
}
exports.deleteThread = deleteThread;
