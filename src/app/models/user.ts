import { Base } from './base';
// import { Attend } from './attend';

export class User extends Base {
    anonymous: boolean;
    complete: boolean;
    firstName: string;
    lastInitial: string;
    name: string;
    dates: string[];   // of Dates
    doc: string[];
    meetingTags: string[]; // closed, gay, na, etc.

    homeGroupId: string;
    favGroups: string[];

    //attendance: Attend [];

    lastActivity: string;   //  Date

    constructor(userRecord: any) {
        super();
        this.anonymous = userRecord.isAnonymous;
        this.complete = false;
        this.dates = [];
        this.doc = [];
        this.meetingTags = [];
        this.homeGroupId = '';
        this.favGroups = [];
        //this.attendance = []
        this.lastActivity = new Date().toUTCString();
        this.firstName = '';
        this.lastInitial = '';
        this.name = '';
        this.setNames(userRecord.displayName, userRecord.isAnonymous);
    }

    setNames(name: string, anonymous: boolean) {
        if (anonymous
            || !name
            || !name.includes(' ')
            || name.length < 3
            || name.split(' ').length < 2) {
                this.firstName = 'ANONYMOUS';
                this.lastInitial = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
        } else {
            let names = name.split(' ');
            this.firstName = names[0];
            this.lastInitial = names[1][0].toUpperCase();
        }
        this.name = `${this.firstName} ${this.lastInitial}.`;
    }
}