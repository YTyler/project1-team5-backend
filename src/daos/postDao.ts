import {QueryCommand, DeleteCommand, PutCommand, ScanCommand, GetCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";
import PostModel, {PostInter} from "../entities/postModel";
import {ddbDoc} from "../../db/dynamo";

export interface IPostDao {
    getOneAuthor: (author: string) => Promise<PostModel|null>;
    getOnePost: (id: number) => Promise<PostModel|null>;
    //getAllPosts: () => Promise<PostModel[]>;
    add: (iPost: PostModel) => Promise<void>;
    // update: (author: string, id: number) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class PostDao implements IPostDao{
    private TableName = 'SYLPH_TABLE';

    public async getOneAuthor(author: string): Promise<PostModel|null>{
        const params = {
            TableName: this.TableName,
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
                console.log("Data: ", data.Items);

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


    // public async getAllPosts(): Promise<PostModel[]> {
    //     let post:PostModel[] = [];

    //     const params = { 
    //         TableName: this.TableName ,
    //         ExpressionAttributeValues: {
    //             ":kind": "user",
    //         },
    //         FilterExpression: "kind = :kind",
    //     };
    
    //     try {
    //       const posts = await ddbDoc.send(new ScanCommand(params));
    //       if(posts.Items){
    //           console.log("It worked");
    //           for( let i of posts.Items){
    //               let Pdata:PostModel(i.userName, i.password, i.email, i.id, i.profile)
    //               post.push(Pdata);
    //           }
    //       }
    //     } catch (err) {
    //       console.log('Error: ', err);
    //     }
    //     return post
    //   }


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
        try {
            const data = await ddbDoc.send(new PutCommand(params));
            console.log(data);
        } catch(error){
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



    public async delete(id: number): Promise<void>{
            const params = {
                TableName: this.TableName,
                Key: {
                    Banana: "post",
                    id: id,
                }
            };
            try{
                await ddbDoc.send(new DeleteCommand(params));
                console.log("Post is deleted");

            } catch(error){
                console.error(error);

            }
    }

}

export default PostDao;