export interface UsersInter {
    userName: string;
    password: string;
    email: string;
    id: number;
    profile: IProfile;
    postsUser: IPost;
 }

 export interface IProfile{
    displayName: string;
    aboutUser: string;
    avatarUser: string;
 }

 export interface IPost{
    postID: string;
 }
 
 export default class UsersModel implements UsersInter {
 
     public userName: string;
     public password: string;
     public email: string;
     public id: number;
     public profile: IProfile;
     public postsUser: IPost;
     [key:string]: any;
 
     constructor(userName:string, password:string, email:string,id:number, profile:IProfile,postsUser:IPost){
         this.userName = userName;
         this.password = password;
         this.email = email;
         this.id = id;
         this.profile = profile;
         this.postsUser = postsUser;
     }
 
 }
 