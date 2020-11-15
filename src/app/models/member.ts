// members collection
import { Base } from './base';

export class Member extends Base {
    uid: string;
    mid: string;
    date: string;

    constructor() {
        super();
        this.uid = '';
        this.mid = '';
        this.date = new Date().toUTCString();
    }
}