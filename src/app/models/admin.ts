import { Base } from './base';

export class Admin extends Base {
    meetingId: string;
    userId: string;
    perms: string [];

    constructor() {
        super();
        this.meetingId = '';
        this.userId = '';
        this.perms = [];

    }
}