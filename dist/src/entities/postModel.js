"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostModel {
    constructor(auth, title, date, descript, media, id) {
        this.author = auth;
        this.title = title;
        this.date = date;
        this.description = descript;
        this.media = media;
        this.id = id;
    }
}
exports.default = PostModel;
