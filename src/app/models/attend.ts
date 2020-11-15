import { Base } from './base';
//import { Point } from './point'

export class Attend extends Base{
    uid: string;
    meeting: string;
    //point: Point;

    constructor() {
        super();
        this.uid = '';
        this.meeting = '';
        //this.point = new Point();
    }
}