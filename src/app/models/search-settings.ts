export interface ISearchSettings {
  zipcode: string,
  gps: boolean,
  lat: number,
  lon: number,
  radius: number,

  byAnyDay: boolean,
  byDay: string,

  bySpecificTime: boolean,
  bySpecific: {
    start: number,     // null = past current time or Time string
    end: number,
    range: number,  // hours past byTime
  },

  // or
  // (bySpecific & byRelative are mutually exclusive)

  // relative to current time
  // use current time window range
  byRelativeTime: boolean,
  byRelative: {
    early: number,
    late: number
  }
} 