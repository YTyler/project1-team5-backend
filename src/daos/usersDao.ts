import {QueryCommand, DeleteCommand, PutCommand, ScanCommand} from "@aws-sdk/lib-dynamodb";
import UsersModel, {UsersInter} from "@entities/usersModel";
import {ddbDoc} from "@daos/db/dynamo";

export interface IUserDao {
    getOne: (name: string) => Promise<UsersModel|null>;
    getAll: () => Promise<UsersModel[]>;
    add: (iUser: UsersModel) => Promise<void>;
    update: (iUser: UsersModel) => Promise<void>;
    delete: (name: string) => Promise<void>;
}

class UserDao implements IUserDao{
    private TableName = '';

    public async getOne(name: string): Promise<UsersModel|null>{
        const params = {
            TableName: this.TableName,
            FilterExpression: "userName = :userName",
            ExpressionAttributeValues: {
                ':userName': name,
            }, 
        };

        const data = await ddbDoc.send(new ScanCommand(params));
        let TeamData:UsersInter;

        if(data.Items !== undefined){
            for(let i of data.Items){
                TeamData = (new UsersModel(i.userName, i.password, i.email, i.profile, i.postsUser));
                return Promise.resolve(TeamData)
                }
            }
            return Promise.resolve(null);
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
                Udata = (new UsersModel(i.userName, i.password, i.email, i.profile, i.postsUser));
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
                userName: user.userName,
                password: user.password,
                email: user.email,
                profile: user.profile,
                postsUser: user.postsUser,
            }
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
                userS = (new UsersModel(i.userName, i.password, i.email, i.profile, i.postsUser));
                if(user){
                    Object.entries(user).forEach(([key, item])=> {
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



    public async delete(name: string): Promise<void>{
        let iUser = await this.getOne(name);
        if(iUser){
            const params = {
                TableName: this.TableName,
                Key: {
                    userName: iUser.userName,
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