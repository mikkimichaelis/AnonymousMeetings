import { IPoint } from './point';

export interface IRideRequest {
    gid: string;
    uid: string;
    date: string;
    phone: string;
    point: IPoint;
    accepted: boolean;
    acceptedDate: string;
    acceptedUid: string;
}