import { IGroup } from 'src/app/models/group';
import { ISchedule } from 'src/app/models/schedule';

export interface IGroupBLLService {
    getNextScheduledMeeting(group: IGroup): ISchedule
}