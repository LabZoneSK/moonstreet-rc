import {
    LOAD_USER_EMAIL,
    LOAD_USER_SETTINGS,
  } from './constants';
  
  /* Action Creators */
  export function loadUserEmail(email:string, uid:number) {
    return {
      type: LOAD_USER_EMAIL,
      email,
      uid,
    };
  }
  
  export function loadUserSettings(userSettings:any) {
    return {
      type: LOAD_USER_SETTINGS,
      userSettings,
    };
  }