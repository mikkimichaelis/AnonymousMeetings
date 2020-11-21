import { Base } from './base';
import { Location } from './location';
import { Schedule } from './schedule';
import { BoundingBox } from './bounding-box';
import { Point } from './point';

export class MeetingInterface extends Base {
    name: string;
    url: string;
    active: boolean;
    zoom: string;
    pw: string;
    notes: string;
    admins: string [];
    location: Location;
    schedule: Schedule;
    boundingbox: BoundingBox;
    point: Point;
    tags: string [];
}