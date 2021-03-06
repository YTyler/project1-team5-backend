"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const threadModel_1 = __importDefault(require("../entities/threadModel"));
const dynamo_1 = require("../../db/dynamo");
class ThreadDao {
    constructor() {
        this.TableName = 'SYLPH_TABLE';
    }
    async getOneAuthor(author) {
        const params = {
            TableName: this.TableName,
            KeyConditionExpression: "kind = :thread AND author = :author",
            ExpressionAttributeValues: {
                ":author": author,
                ":thread": "thread"
            },
            IndexName: "kind-author-index"
        };
        try {
            const data = await dynamo_1.ddbDoc.send(new lib_dynamodb_1.QueryCommand(params));
            let TData;
            if (data.Items) {
                console.log("Data: ", data.Items);
                for (let i of data.Items) {
                    TData = (new threadModel_1.default(i.author, i.title, i.date, i.description, i.media, i.id));
                    return TData;
                }
            }
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    async getOneThread(id) {
        const params = {
            TableName: this.TableName,
            Key: {
                kind: "thread",
                id: id
            }
        };
        try {
            const data = await dynamo_1.ddbDoc.send(new lib_dynamodb_1.GetCommand(params));
            return data.Item;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    async getAll() {
        const params = {
            TableName: this.TableName,
            KeyConditionExpression: 'kind = :kind',
            ExpressionAttributeValues: {
                ":kind": "thread"
            },
        };
        try {
            const data = await dynamo_1.ddbDoc.send(new lib_dynamodb_1.QueryCommand(params));
            return data.Items;
        }
        catch (err) {
            console.log('Error: ', err);
        }
    }
    async add(iThread) {
        const params = {
            TableName: this.TableName,
            Item: {
                kind: "thread",
                author: iThread.author,
                title: iThread.title,
                date: iThread.date,
                description: iThread.description,
                media: iThread.media,
                id: iThread.id
            },
        };
        try {
            const data = await dynamo_1.ddbDoc.send(new lib_dynamodb_1.PutCommand(params));
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    }
    //TODO
    // public async update(iThread: ThreadModel): Promise<void>{
    //     const params = {
    //         TableName: this.TableName,
    //         Item: {
    //             ":author": iThread.author
    //         }
    //     };
    //     try {  
    //         const data = await ddbDoc.send(new ScanCommand(params));
    //         if(data.Items){
    //             console.log("It works! :D", data.Items);
    //         let thread:ThreadModel;
    //         for(let i of data.Items){
    //             thread = (new ThreadModel(i.author, i.title, i.date, i.description, i.media, i.id));
    //             if(thread){
    //                 Object.entries(thread).forEach(([key, item])=> {
    //                     thread[`${key}`] = item;
    //                 })
    //                     await this.add(thread)
    //                 }
    //             }
    //         }
    //     } catch (error){
    //         console.error(error);
    //     }
    // }
    async delete(id) {
        const params = {
            TableName: this.TableName,
            Key: {
                kind: "thread",
                id: id,
            }
        };
        try {
            await dynamo_1.ddbDoc.send(new lib_dynamodb_1.DeleteCommand(params));
            console.log("Thread is deleted");
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = ThreadDao;
