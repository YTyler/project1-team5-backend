export interface UsersInter {
    userName: string;
    password: string;
    email: string;
    id: number;
    profile: IProfile;
 }

 export interface IProfile{
    displayName: string;
    aboutUser: string;
    avatarUser: string;
 }
 
 export default class UsersModel implements UsersInter {
 
     public userName: string;
     public password: string;
     public email: string;
     public id: number;
     public profile: IProfile;
     [key:string]: any;
 
     constructor(userName:string, password:string, email:string,id:number, profile:IProfile){
         this.userName = userName;
         this.password = password;
         this.email = email;
         this.id = id;
         this.profile = profile;
     }
 
 }
 