export interface ThreadInter{
    author: string;
    title: string;
    date: string;
    description : string;
    media : string;
    id: number;
}

class ThreadModel implements ThreadInter{
    public author: string;
    public title: string;
    public date : string;
    public description : string;
    public media : string;
    public id: number;

    constructor(auth : string, title :string, date : string, descript :string, media :string, id: number) {
        this.author  = auth ;
        this.title  = title ;
        this.date  = date ;
        this.description  = descript ;
        this.media  = media ;
        this.id = id;
    }
}

export default ThreadModel;
