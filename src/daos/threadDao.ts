import {QueryCommand, DeleteCommand, PutCommand, ScanCommand, GetCommand} from "@aws-sdk/lib-dynamodb";
import ThreadModel, {ThreadInter} from "../entities/threadModel";
import {ddbDoc} from "../../db/dynamo";

export interface IThreadDao {
    getOneAuthor: (author: string) => Promise<ThreadModel|null>;
    getOneThread: (id: number) => Promise<ThreadModel|null>;
    getAll: () => Promise<ThreadModel[]>;
    add: (iThread: ThreadModel) => Promise<void>;
    // update: (iThread: ThreadModel) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class ThreadDao implements IThreadDao{
    private TableName = 'SYLPH_TABLE';

    public async getOneAuthor(author: string): Promise<ThreadModel|null>{
        const params = {
            TableName: this.TableName,
            KeyConditionExpression:
                "kind = :thread AND author = :author" ,
            ExpressionAttributeValues: {
                ":author": author,
                ":thread": "thread"
            },
            IndexName: "kind-author-index"
            
        };

        try{
            const data = await ddbDoc.send(new QueryCommand(params));
            console.log("HERE?");

            let TData:ThreadModel;
            if(data.Items){
                console.log("It worked! :D", data.Items);

            for(let i of data.Items){
                TData = (new ThreadModel(i.author, i.title, i.date, i.description, i.media, i.id));
                return TData
            }
        }
    }catch (err){
            console.error(err);
            return null;
        }

    }  
    

    public async getOneThread(id: number): Promise<ThreadModel|null>{
        const params = {
            TableName: this.TableName,
            Key: {
                kind: "thread",
                id: id
            }
        };

        try{
            const data = await ddbDoc.send(new GetCommand(params));
            return data.Item as ThreadInter;
        }catch (err){
            console.error(err);
            return null;
        }

        
    }


    public async getAll(): Promise<ThreadModel[]> {
        let thread:ThreadModel[] = [];

        const params = { 
            TableName: this.TableName ,
            ExpressionAttributeValues: {
                ":kind": "thread",
            },
            FilterExpression: "kind = :kind",
        };
    
        try {
          const threads = await ddbDoc.send(new ScanCommand(params));
          if(threads.Items){
              console.log("It worked");
              for( let i of threads.Items){
                  let Tdata:ThreadModel = new ThreadModel(i.author, i.title, i.date, i.description, i.media, i.id);
                  thread.push(Tdata);
              }
          }
        } catch (err) {
          console.log('Error: ', err);
        }
        return thread
      }


    public async add(iThread: ThreadModel): Promise<void>{
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
        console.log(params.Item);
        try {
            const data = await ddbDoc.send(new PutCommand(params));
            console.log(data);
        } catch(error){
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



    public async delete(id: number): Promise<void>{
        const params = {
            TableName: this.TableName,
            Key: {
                kind: "thread",
                id: id,
            }
        };
        try{
            await ddbDoc.send(new DeleteCommand(params));
            console.log("Thread is deleted");

        } catch(error){
            console.error(error);

        }
}

}

export default ThreadDao;