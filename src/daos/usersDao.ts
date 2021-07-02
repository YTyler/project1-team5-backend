import {QueryCommand, DeleteCommand, PutCommand, ScanCommand, GetCommand} from "@aws-sdk/lib-dynamodb";
import UsersModel, {UsersInter} from "../entities/usersModel";
import {ddbDoc} from "../../db/dynamo";
import { assertUserWhitespacable } from "@babel/types";

export interface IUserDao {
    getOne: (id: number) => Promise<UsersModel|null>;
    getAll: () => Promise<UsersModel[]>;
    add: (iUser: UsersModel) => Promise<void>;
    update: (iUser: UsersModel) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class UserDao implements IUserDao{
    private TableName = 'Test';

    public async getOne(id: number): Promise<UsersModel|null>{
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

        try{
            const data = await ddbDoc.send(new GetCommand(params));
            return data.Item as UsersInter;
        }catch (err){
            console.error(err);
            return null;
        }

        
    }


    public async getAll(): Promise<UsersModel[]>{
        let user:UsersModel[] = [];

        const params = {
            TableName: this.TableName,
            Items: {
                ":userName": ''
            },

            Expression: "userName >= :userName",
        };
        try {
            let Udata:UsersModel;
            const data = await ddbDoc.send(new ScanCommand(params));
            if(data.Items){
                console.log("It worked! :D", data.Items);

            for(let i of data.Items){
                Udata = (new UsersModel(i.userName, i.password, i.email, i.id, i.profile));
                user.push(Udata); 
            }
            }

        } catch (error){
            console.error(error);
        }
        return user;
    }


    public async add(user: UsersModel): Promise<void>{
        const params = {
            TableName: this.TableName,
            Item: {
                type: "user",
                userName: user.userName,
                password: user.password,
                email: user.email,
                id: user.id,
                profile: user.profile,
            },
        };
        console.log(params.Item);
        try {
            const data = await ddbDoc.send(new PutCommand(params));
            console.log(data);
        } catch(error){
            console.error(error);
        }
    }

    public async update(user: UsersModel): Promise<void>{
        const params = {
            TableName: this.TableName,
            Item: {
                ":userName": user.userName
            }
        };
        try {  
            const data = await ddbDoc.send(new ScanCommand(params));
            if(data.Items){
                console.log("It works! :D", data.Items);
            let userS:UsersModel;
            for(let i of data.Items){
                userS = (new UsersModel(i.userName, i.password, i.email, i.id, i.profile));
                if(userS){
                    Object.entries(userS).forEach(([key, item])=> {
                        userS[`${key}`] = item;
                    })
                await this.add(userS)
                    }
                }
            }

        } catch (error){
            console.error(error);
        }
    }



    public async delete(id: number): Promise<void>{
        let iUser = await this.getOne(id);
        if(iUser){
            const params = {
                TableName: this.TableName,
                Key: {
                    type: "user",
                    id: id,
                }
            };
            try{
                const data = await ddbDoc.send(new DeleteCommand(params));
                console.log(data);

            } catch(error){
                console.error(error);

            }
        } else{
            console.log("Team is lost in time");
        }
    }

}

export default UserDao