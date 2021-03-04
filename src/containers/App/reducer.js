import { fromJS } from 'immutable';
import {
  LOAD_USER_EMAIL,
  LOAD_USER_SETTINGS
} from './constants';

/* TODO: Load userstuff from database */
const initialState = fromJS({
  email: '',
  uid: '',
  settings: {}
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_EMAIL:
      return state
        .set('uid', action.uid)
        .set('email', action.email);
    case LOAD_USER_SETTINGS:
      return state
        .set('settings', action.userSettings)
    default:
      return state;
  }
};

export default userReducer;
