import { Base } from './base';
import { GeoPoint } from 'firestore';

export class Point extends Base {
    geohash: string;
    geopoint: GeoPoint;

    constructor() {
        super();
        this.geohash = '';
        this.geopoint = null;
    }

    export(): any {
        let geopoint = this.geopoint;
        let json = JSON.parse(JSON.stringify(this));
        json.geopoint = geopoint;
    }
};
