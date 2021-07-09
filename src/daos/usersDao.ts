import {QueryCommand, DeleteCommand, PutCommand, ScanCommand, GetCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";
import UsersModel, {UsersInter} from "../entities/usersModel";
import {ddbDoc} from "../../db/dynamo";

export interface IUserDao {
    getOne: (id: number) => Promise<UsersModel|null>;
    getOneUser: (name: string) => Promise<UsersModel[]|null>;
    getAll: () => Promise<UsersModel[]>;
    add: (iUser: UsersModel) => Promise<void>;
    update: (iUser: UsersModel) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class UserDao implements IUserDao{
    private TableName = 'SYLPH_TABLE';

    public async getOne(id: number): Promise<UsersModel|null>{
        const params = {
            TableName: this.TableName,
            Key: {
                kind: "user",
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

    public async getOneUser(name: string): Promise<UsersModel[]|null>{
        const params = {
            TableName: this.TableName,
            FilterExpression: "userName = :userName",
            ExpressionAttributeValues: {
                ':userName': name,
            }, 
        };
            let UData:UsersModel[] = [];
            const data = await ddbDoc.send(new ScanCommand(params));
            
            if(data.Items !== undefined){
                for(let i of data.Items){
                    UData.push(new UsersModel(i.userName, i.password, i.email, i.id, i.profile));
                }
                return Promise.resolve(UData);
            }
            return Promise.resolve(null); 

    }


    public async getAll(): Promise<UsersModel[]> {
        const params = { 
            TableName: this.TableName,
            KeyConditionExpression: 'kind = :kind',
       
            ExpressionAttributeValues: {
                ":kind":"user"
            },
        };
    
        try {
          const data = await ddbDoc.send(new QueryCommand(params));
          return data.Items as UsersModel[];
        } catch (err) {
          console.log('Error: ', err);
        }
      }


    public async add(user: UsersModel): Promise<void>{
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
        try {
            const data = await ddbDoc.send(new PutCommand(params));
        } catch(error){
            console.error(error);
        }
    }

    public async update(user: UsersModel): Promise<void>{
        const params = {
            TableName: this.TableName,
            Key: {
                kind: "user",
                id: user.id
            },
            UpdateExpression: "SET userName = :userName, password = :password, email = :email, profile = :profile",
            ConditionExpression:'attribute_exists(id)',
            ExpressionAttributeValues: {
                ":userName": user.userName,
                ":password": user.password,
                ":email": user.email,
                ":profile": user.profile
            }
        };
        try {  
            await ddbDoc.send(new UpdateCommand(params));
            console.log("Updated");
            
        } catch(err){
            console.log("Error: ", err);
        }
    }



    public async delete(id: number): Promise<void>{
        const params = {
            TableName: this.TableName,
            Key: {
                kind: "user",
                id: id,
            }
        };
        try{
            await ddbDoc.send(new DeleteCommand(params));
            console.log("user is deleted");

        } catch(error){
            console.error(error);

        }
}

}

export default UserDao