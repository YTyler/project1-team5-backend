"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsersModel {
    constructor(userName, password, email, id, profile, postsUser) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.id = id;
        this.profile = profile;
        this.postsUser = postsUser;
    }
}
exports.default = UsersModel;
