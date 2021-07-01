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
        this.TableName = 'Sylph';
    }
    async getOne(id) {
        const params = {
            TableName: this.TableName,
            // FilterExpression: "userName = :userName",
            // ExpressionAttributeValues: {
            //     ':userName': name,
            // }, 
            Key: {
                type: "user",
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
        let user = [];
        const params = {
            TableName: this.TableName,
            Items: {
                ":userName": ''
            },
            Expression: "userName >= :userName",
        };
        try {
            let Udata;
            const data = await dynamo_1.ddbDoc.send(new lib_dynamodb_1.ScanCommand(params));
            if (data.Items) {
                console.log("It worked! :D", data.Items);
                for (let i of data.Items) {
                    Udata = (new usersModel_1.default(i.userName, i.password, i.email, i.id, i.profile, i.postsUser));
                    user.push(Udata);
                }
            }
        }
        catch (error) {
            console.error(error);
        }
        return user;
    }
    async add(user) {
        const params = {
            TableName: this.TableName,
            Item: {
                type: "user",
                userName: user.userName,
                password: user.password,
                email: user.email,
                id: user.id,
                profile: user.profile,
                postsUser: user.postsUser,
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
            Item: {
                ":userName": user.userName
            }
        };
        try {
            const data = await dynamo_1.ddbDoc.send(new lib_dynamodb_1.ScanCommand(params));
            if (data.Items) {
                console.log("It works! :D", data.Items);
                let userS;
                for (let i of data.Items) {
                    userS = (new usersModel_1.default(i.userName, i.password, i.email, i.id, i.profile, i.postsUser));
                    if (user) {
                        Object.entries(user).forEach(([key, item]) => {
                            userS[`${key}`] = item;
                        });
                        await this.add(userS);
                    }
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async delete(id) {
        let iUser = await this.getOne(id);
        if (iUser) {
            const params = {
                TableName: this.TableName,
                Key: {
                    type: "user",
                    id: id,
                }
            };
            try {
                const data = await dynamo_1.ddbDoc.send(new lib_dynamodb_1.DeleteCommand(params));
                console.log(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            console.log("Team is lost in time");
        }
    }
}
exports.default = UserDao;
