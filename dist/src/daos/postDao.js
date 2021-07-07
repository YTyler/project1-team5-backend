"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const postModel_1 = __importDefault(require("../entities/postModel"));
const dynamo_1 = require("../../db/dynamo");
class PostDao {
    constructor() {
        this.TableName = 'Testing';
    }
    async getOneAuthor(author) {
        const params = {
            TableName: this.TableName,
            KeyConditionExpression: "Banana = :post AND author = :author",
            ExpressionAttributeValues: {
                ":author": author,
                ":post": "post"
            },
            IndexName: "Banana-author-index"
        };
        try {
            const data = await dynamo_1.ddbDoc.send(new lib_dynamodb_1.QueryCommand(params));
            let PData;
            if (data.Items) {
                console.log("It worked! :D", data.Items);
                for (let i of data.Items) {
                    PData = (new postModel_1.default(i.author, i.title, i.date, i.description, i.media, i.id));
                    return PData;
                }
            }
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    async getOnePost(id) {
        const params = {
            TableName: this.TableName,
            // FilterExpression: "userName = :userName",
            // ExpressionAttributeValues: {
            //     ':userName': name,
            // }, 
            Key: {
                Banana: "post",
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
    async getAllPosts() {
        const params = { TableName: this.TableName };
        try {
            const posts = await dynamo_1.ddbDoc.send(new lib_dynamodb_1.ScanCommand(params));
            return posts.Items;
        }
        catch (err) {
            console.log('Error: ', err);
        }
    }
    async add(iPost) {
        const params = {
            TableName: this.TableName,
            Item: {
                Banana: "post",
                author: iPost.author,
                title: iPost.title,
                date: iPost.date,
                description: iPost.description,
                media: iPost.media,
                id: iPost.id
            },
        };
        console.log(params.Item);
        try {
            const data = await dynamo_1.ddbDoc.send(new lib_dynamodb_1.PutCommand(params));
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    }
    // public async update(author: string): Promise<void>{
    //     const params = {
    //         TableName: this.TableName,
    //         Key:{
    //             Banana: "post",
    //             id: 69
    //         },
    //         UpdateExpression: 
    //             "set author = :author",
    //         ExpressionAttributeValues: {
    //             ":author": author
    //         },
    //     };
    //     try {  
    //         console.log(author, "Here I am");
    //         await ddbDoc.send(new UpdateCommand(params));
    //         console.log("It works");
    //     } catch (error){
    //         console.error(error);
    //     }
    // }
    async delete(id) {
        const params = {
            TableName: this.TableName,
            Key: {
                Banana: "post",
                id: id,
            }
        };
        try {
            await dynamo_1.ddbDoc.send(new lib_dynamodb_1.DeleteCommand(params));
            console.log("Post is deleted");
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = PostDao;
