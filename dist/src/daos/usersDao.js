"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const usersModel_1 = __importDefault(require("../entities/usersModel"));
const dynamo_1 = require("../../db/dynamo");
class UserDao {
    constructor() {
        this.TableName = 'SYLPH_TABLE';
    }
    async getOne(id) {
        const params = {
            TableName: this.TableName,
            // FilterExpression: "userName = :userName",
            // ExpressionAttributeValues: {
            //     ':userName': name,
            // }, 
            Key: {
                kind: "user",
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
        let post = [];
        const params = {
            TableName: this.TableName,
            ExpressionAttributeValues: {
                ":kind": "user",
            },
            FilterExpression: "kind = :kind",
        };
        try {
            const posts = await dynamo_1.ddbDoc.send(new lib_dynamodb_1.ScanCommand(params));
            if (posts.Items) {
                console.log("It worked");
                for (let i of posts.Items) {
                    let Pdata = new usersModel_1.default(i.userName, i.password, i.email, i.id, i.profile);
                    post.push(Pdata);
                }
            }
        }
        catch (err) {
            console.log('Error: ', err);
        }
        return post;
    }
    async add(user) {
        const params = {
            TableName: this.TableName,
            Item: {
                kind: "user",
                userName: user.userName,
                password: user.password,
                email: user.email,
                id: user.id,
                profile: user.profile,
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
    async update(user) {
        const params = {
            TableName: this.TableName,
            Key: {
                kind: "user",
                id: user.id
            },
            UpdateExpression: "SET userName = :userName, password = :password, email = :email, profile = :profile",
            ConditionExpression: 'attribute_exists(id)',
            ExpressionAttributeValues: {
                ":userName": user.userName,
                ":password": user.password,
                ":email": user.email,
                ":profile": user.profile
            }
        };
        try {
            await dynamo_1.ddbDoc.send(new lib_dynamodb_1.UpdateCommand(params));
            console.log("Updated");
        }
        catch (err) {
            console.log("Error: ", err);
        }
    }
    async delete(id) {
        const params = {
            TableName: this.TableName,
            Key: {
                kind: "user",
                id: id,
            }
        };
        try {
            await dynamo_1.ddbDoc.send(new lib_dynamodb_1.DeleteCommand(params));
            console.log("user is deleted");
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = UserDao;
