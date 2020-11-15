export class Schedule {
    day: string;        // UI string representing dow when meeting occurs ie Monday
    time: string;       // UI string representing time when meeting occurs ie T7:00:00-04:00
    offset: number;     // Millisecond time offset from day @ midnight when meeting starts for easy comparison
    // offset includes dow + time in ms
    // NOTE: Timezone and UTC offset are irrelevant because the phones time will 
    // be in the ame tz/utc offset as the meeting.  Therefore they can be ignored
    // and a comparison be performed simply on 12h a/p format, just like a humans do.
    // IE. when checking if I've arrived at a meeting on time and the meeting starts at
    // 7pm and my phone says 6:50pm, I don't check the meetings tz offset, check if Daylight Savings
    // is in effect, or if I'm accidentally in the wrong timezone.  Technically my phones TZ can be
    // wrong, and that would cause problems, but thats a user error for which I'll not write code to handle.
    // I'll assume if a person is standing at a meeting their phone is in the same tz as the meeting itself.
    duration: number;   // minute duration of meeting
};
