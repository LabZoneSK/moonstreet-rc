import {
  LOAD_USER_EMAIL,
  LOAD_USER_SETTINGS,
} from './constants';

/* TODO: Load userstuff from database */
const initialState = {
  email: '',
  uid: '',
  settings: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_EMAIL:
      return {
        ...state,
        uid: action.uid,
        email: action.email,
      };
    case LOAD_USER_SETTINGS:
      return {
        ...state,
        settings: action.userSettings,
      };
    default:
      return state;
  }
};

export default userReducer;
