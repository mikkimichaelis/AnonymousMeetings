import { Base } from './base';
import { Attend } from './attend';

export class User extends Base {
    anonymous: boolean;
    complete: boolean;
    firstName: string;
    lastInitial: string;
    name: string;
    dates: string [];   // of Dates
    doc: string [];
    meetingTags: string []; // closed, gay, na, etc.
    
    homeGroupId: string;
    favGroups: string [];

    attendance: Attend [];

    lastActivity: string;   //  Date

    constructor(userRecord: any) {
        super();
        this.anonymous = userRecord.isAnonymous;
        this.complete = false;
        let names = this.anonymous ? ['Person'] : userRecord.displayName.split(' ');
        this.firstName = names[0] ? names[0] : 'Person';
        this.lastInitial = names[1] ? names[1][0] : this.randomLetter();
        this.name = `${this.firstName} ${this.lastInitial}.`;
        this.dates = [];
        this.doc = [];
        this.meetingTags = [];
        this.homeGroupId = '';
        this.favGroups = [];
        this.attendance = []
        this.lastActivity = new Date().toUTCString();
    }

randomLetter() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet[Math.floor(Math.random() * alphabet.length)]
      }
      
}