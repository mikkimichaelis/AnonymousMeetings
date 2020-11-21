export interface IMessage {
    id: string;
    rid: string; // reply message id
    
    fromId: string;
    fromName: string;

    toId: string;
    toName: string;

    date: string;
    read: string;

    text: string;
}