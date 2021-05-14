import { removeKey } from '../../utils/Utils';
import {
  ICO_ADD,
  ICO_REMOVE,
} from './constants';

const icosReducer = (state = {}, action) => {
  switch (action.type) {
    case ICO_ADD:
      return {
        ...state,
        [action.key]: action.ICOObj,
      };
    case ICO_REMOVE:
      return removeKey(state, action.key);
    default:
      return state;
  }
};

export default icosReducer;
