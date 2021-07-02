import {QueryCommand, DeleteCommand, PutCommand, ScanCommand, GetCommand} from "@aws-sdk/lib-dynamodb";
import PostModel, {PostInter} from "../entities/postModel";
import {ddbDoc} from "../../db/dynamo";

export interface IPostDao {
    getOneAuthor: (author: string) => Promise<PostModel|null>;
    getOnePost: (id: number) => Promise<PostModel|null>;
    getAll: () => Promise<PostModel[]>;
    add: (iPost: PostModel) => Promise<void>;
    update: (iPost: PostModel) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class PostDao implements IPostDao{
    private TableName = 'Testing';

    public async getOneAuthor(author: string): Promise<PostModel|null>{
        let user:PostModel[] = [];
        const params = {
            TableName: this.TableName,
            // FilterExpression: "userName = :userName",
            // ExpressionAttributeValues: {
            //     ':userName': name,
            // },
            KeyConditionExpression:
                "Banana = :post AND author = :author" ,
            ExpressionAttributeValues: {
                ":author": author,
                ":post": "post"
            },
            IndexName: "Banana-author-index"
            
        };

        try{
            const data = await ddbDoc.send(new QueryCommand(params));

            let PData:PostModel;
            if(data.Items){
                console.log("It worked! :D", data.Items);

            for(let i of data.Items){
                PData = (new PostModel(i.author, i.title, i.date, i.description, i.media, i.id));
                return PData
            }
        }
    }catch (err){
            console.error(err);
            return null;
        }

    }  
    

    public async getOnePost(id: number): Promise<PostModel|null>{
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

        try{
            const data = await ddbDoc.send(new GetCommand(params));
            return data.Item as PostInter;
        }catch (err){
            console.error(err);
            return null;
        }

        
    }


    public async getAll(): Promise<PostModel[]>{
        let user:PostModel[] = [];

        const params = {
            TableName: this.TableName,
            Items: {
                ":author": ''
            },

            Expression: "author >= :author",
        };
        try {
            let PData:PostModel;
            const data = await ddbDoc.send(new ScanCommand(params));
            if(data.Items){
                console.log("It worked! :D", data.Items);

            for(let i of data.Items){
                PData = (new PostModel(i.author, i.title, i.date, i.description, i.media, i.id));
                user.push(PData); 
            }
            }

        } catch (error){
            console.error(error);
        }
        return user;
    }


    public async add(iPost: PostModel): Promise<void>{
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
            const data = await ddbDoc.send(new PutCommand(params));
            console.log(data);
        } catch(error){
            console.error(error);
        }
    }

    public async update(iPost: PostModel): Promise<void>{
        const params = {
            TableName: this.TableName,
            Item: {
                ":author": iPost.author
            }
        };
        try {  
            const data = await ddbDoc.send(new ScanCommand(params));
            if(data.Items){
                console.log("It works! :D", data.Items);
            let post:PostModel;
            for(let i of data.Items){
                post = (new PostModel(i.author, i.title, i.date, i.description, i.media, i.id));
                if(post){
                    Object.entries(post).forEach(([key, item])=> {
                        post[`${key}`] = item;
                    })
                        await this.add(post)
                    }
                }
            }

        } catch (error){
            console.error(error);
        }
    }



    public async delete(id: number): Promise<void>{
        let iPost = await this.getOnePost(id);
        if(iPost){
            const params = {
                TableName: this.TableName,
                Key: {
                    type: "post",
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

export default PostDao;