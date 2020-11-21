import { GeoPoint } from 'firestore';

export interface IPoint {
    geohash: string;
    geopoint: GeoPoint;
};
