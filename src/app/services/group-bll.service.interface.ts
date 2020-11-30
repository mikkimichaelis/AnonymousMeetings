import { IGroup, ISchedule } from '../../models';

export interface IGroupBLLService {
    getNextScheduledMeeting(group: IGroup): ISchedule
}