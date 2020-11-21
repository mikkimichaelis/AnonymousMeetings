import { ILocation } from './location';
import { ISchedule } from './schedule';
import { IBoundingBox } from './bounding-box';
import { IPoint } from './point';
import { IMemberUser } from './user';

export interface Group {
    name: string;
    url: string;
    active: boolean;
    zoom: string;
    pw: string;
    notes: string;
    admins: string [];
    location: ILocation;
    timezone: number;
    daylightsavings: boolean;
    schedule: ISchedule;
    boundingbox: IBoundingBox;
    point: IPoint;
    tags: string [];
    members: IMemberUser[];
}

export interface IFavGroup {
    id: string;
    name: string;
    active: boolean;
    zoom: string;
    schedule: string;
}