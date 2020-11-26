import { IUserStub } from '.';

export interface IChatSession {
    id: string;
    participants: IUserStub
    messages: string[];
    
}