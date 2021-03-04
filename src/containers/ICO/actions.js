//import { database } from '../../firebase';

import {
    ICO_ADD,
    ICO_REMOVE,
    ICO_LOAD,
    ICO_LOADED
  } from './constants';

const loadICOs = (userID) => {
  return dispatch => {
    dispatch(requestICOs());
    /*
    if (loading === false) {
      loading === true;
      return database.ref(userID).child('clients/own/icos').once('value')
      .then(snap => {
          dispatch (loadedICOs(snap.val()));
      });
    }*/
  }
}

/* Action Creators */
export function addICO(key, ICOObj) {
  console.log('action');
  return {
    type: ICO_ADD,
    key,
    ICOObj
  };
}

export function fetchICOs(userID) {
  return (dispatch) => {
    if(userID === '') return dispatch(requestICOs());

    return dispatch(loadICOs(userID))
  }
}

export function requestICOs() {
  return {
    type: ICO_LOAD,
    icos: {},
    loading: true
  };
}

export function loadedICOs(loadedData) {
  console.log(loadedData);
  // loading = false;
  return {
    type: ICO_LOADED,
    icos: loadedData,
    loading: false
  }
}

export function removeICO(icoKey) {
  return {
    type: ICO_REMOVE,
    //walletKey,
  };
}
