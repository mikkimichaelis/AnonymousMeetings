export interface IReminder {
    sid: string;
    uid: string;
    mid: string;
    created: string;
    next: string;
    active: boolean;
    recurring: boolean;
    message: string;
}