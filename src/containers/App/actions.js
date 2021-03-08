import {
  LOAD_USER_EMAIL,
  LOAD_USER_SETTINGS,
} from './constants';

/* Action Creators */
export function loadUserEmail(email, uid) {
  return {
    type: LOAD_USER_EMAIL,
    email,
    uid,
  };
}

export function loadUserSettings(userSettings) {
  return {
    type: LOAD_USER_SETTINGS,
    userSettings,
  };
}

