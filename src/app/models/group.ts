import { ILocation, ISchedule, IBoundingBox, IPoint, IRideRequest, IAddress, IUserStub, IUserAdmin } from '.';

export interface IGroupPrivate {
    gid: string;
    owner: IUserAdmin;
    admins: IUserAdmin [];
}

export interface IGroup {
    name: string;
    type: string;
    membersOnline: number;   
    active: boolean;

    tags: string []; 
    about: string;
    point: IPoint;

    monthsSobriety: number;
    schedule: ISchedule[];

    notes: string;

    telephone: string;
    email: string;
    url: string;
    
    mailAddress: IAddress;

    started: string;    
    
    location: ILocation;
    timezone: number;
    daylightsavings: boolean;
    
    boundingbox: IBoundingBox;

    members: IUserStub[];

    lastActivity: string;
}