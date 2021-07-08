"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsersModel {
    constructor(userName, password, email, id, profile) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.id = id;
        this.profile = profile;
    }
}
exports.default = UsersModel;
