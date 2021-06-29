import { UserModel } from "@entities/usersModel";

declare module 'express' {
    export interface Request  {
        body: {
            user: IUser
        };
    }
}
