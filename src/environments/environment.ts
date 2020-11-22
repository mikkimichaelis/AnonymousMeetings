// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDTB6TRgJNOHvuq_L0YxNHSRufJx36y6dk",
    authDomain: "anonymousmeetings.firebaseapp.com",
    databaseURL: "https://anonymousmeetings.firebaseio.com",
    projectId: "anonymousmeetings",
    storageBucket: "anonymousmeetings.appspot.com",
    messagingSenderId: "743896601158",
    appId: "1:743896601158:web:460244580c9f6cdaaab047",
    measurementId: "G-KJRD16EWZ5"
  },
  googleCloudConfig: {
    agmKey: 'AIzaSyAvpI4Ej5P2bwN04Zq2dsLVIh5AS-auaMo'
  },
  logRocketConfig: {
    appID: 'tdzfnj/anonymous-meetings',
    options: {}
  },
  defaultSettings: {
    darkTheme: false,
    searchSettings: {
      zipcode: null,    // zip -> gps
      gps: true,
      lat: null,
      lon: null,
      radius: 16,       // 16km (10 miles)
  
      byAnyDay: true,
      byDay: 'today',      // today or dow
      
      // specify specific time
      bySpecificTime: false,
      bySpecific: {
        start: null,
        end: null,
      },

      // or
      // (bySpecific & byRelative are mutually exclusive)
  
      // relative to current time
      // use current time window range
      byRelativeTime: false,
      byRelative: { 
        early: 2, 
        late: 10 
      }   
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
