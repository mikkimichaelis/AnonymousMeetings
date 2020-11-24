import { ILocation } from './location';
import { ISchedule } from './schedule';
import { IBoundingBox } from './bounding-box';
import { IPoint } from './point';
import { IRideRequest } from './ride-request';
import { IAddress } from './address';
import { IUserMember } from './user-member';

export interface IGroup {
    active: boolean;
    name: string;
    type: string;
    tags: string [];
    started: string;
    lastActivity: string;
    monthsSobriety: number;
    about: string;
    notes: string;

    schedule: ISchedule[];

    zoom: string;
    pw: string;

    rideRequests: IRideRequest[];

    telephone: string;
    email: string;
    url: string;
    
    mailAddress: IAddress;
    
    admins: string [];
    location: ILocation;
    timezone: number;
    daylightsavings: boolean;
    
    boundingbox: IBoundingBox;
    point: IPoint;
    
    membersOnline: number;
    members: IUserMember[];
}