export const environment = {
  production: true,
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
      byDay: null,      // null = today or dow
      
      // specify specific time
      bySpecificTime: false,
      bySpecific: {
        time: null,     // null = past current time or Time string
        range: null,    // hours past byTime
      },

      // or
      // (bySpecific & byRelative are mutually exclusive)
  
      // relative to current time
      // use current time window range
      byRelativeTime: false,
      byRelative: { 
        early: null, 
        late: null 
      }   
    }
  }
};
