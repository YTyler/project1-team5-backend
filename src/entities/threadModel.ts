export interface ThreadInter{
    author: string;
    title: string;
    date: number;
    description : string;
    media : string;
}

class ThreadModel implements ThreadInter{
    public author: string;
    public title: string;
    public date : number;
    public description : string;
    public media : string;

    constructor(auth : string, title :string, date : number, descript :string, media :string) {
        this.author  = auth ;
        this.title  = title ;
        this.date  = date ;
        this.description  = descript ;
        this.media  = media ;
    }
}

export default ThreadModel;
