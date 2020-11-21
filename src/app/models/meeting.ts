import { Base } from './base';
import { Location } from './location';
import { Schedule } from './schedule';
import { BoundingBox } from './bounding-box';
import { Point } from './point';

export class Meeting extends Base {
    name: string;
    url: string;
    active: boolean;
    zoom: string;
    pw: string;
    notes: string;
    admins: string [];
    location: Location;
    schedule: Schedule [];
    boundingbox: BoundingBox;
    point: Point;
    tags: string [];

    constructor() {
        super();
        this.name = '';
        this.url = '';
        this.active = true;
        this.zoom = '';
        this.notes = '';
        this.admins = [];
        this.location = new Location();
        this.schedule = [];
        this.boundingbox = new BoundingBox();
        this.point = new Point();
        this.tags = [];
    }
}