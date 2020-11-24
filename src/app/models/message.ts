export interface IMessage {
    gid: string
    gname: string;
    fuid: string;
    fname: string;
    tuid: string;
    tname: string;

    replyMid: string;
    
    date: string;
    read: string;

    text: string;
}