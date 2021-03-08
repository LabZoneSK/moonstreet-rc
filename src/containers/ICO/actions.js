// import { database } from '../../firebase';

import {
  ICO_ADD,
  ICO_REMOVE,
  ICO_LOAD,
  ICO_LOADED,
} from './constants';

export function requestICOs() {
  return {
    type: ICO_LOAD,
    icos: {},
    loading: true,
  };
}

const loadICOs = () => (dispatch) => {
  dispatch(requestICOs());
  /*
  if (loading === false) {
    loading === true;
    return database.ref(userID).child('clients/own/icos').once('value')
    .then(snap => {
        dispatch (loadedICOs(snap.val()));
    });
  }
  */
};

/* Action Creators */
export function addICO(key, ICOObj) {
  return {
    type: ICO_ADD,
    key,
    ICOObj,
  };
}

export function fetchICOs(userID) {
  return (dispatch) => {
    if (userID === '') return dispatch(requestICOs());

    return dispatch(loadICOs(userID));
  };
}

export function loadedICOs(loadedData) {
  return {
    type: ICO_LOADED,
    icos: loadedData,
    loading: false,
  };
}

export function removeICO(icoKey) {
  return {
    type: ICO_REMOVE,
    icoKey,
  };
}
