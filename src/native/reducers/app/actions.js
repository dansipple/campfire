import * as types from './actionTypes';

import {AsyncStorage} from 'react-native';

import UserController from '../../../lib/controllers/user';

import firebase from '../../../lib/firebase';

var Analytics = require('react-native-firebase-analytics');

export function appInitialized() {
  return async function(dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code

      firebase.auth().onAuthStateChanged(function(user) {
            if(user) {
                dispatch(login(user));
            } else {
                dispatch(changeAppRoot('login'));
            }
      });
  };
}


export function changeNetwork(network) {
    return {type: types.NETWORK_CHANGED, network: network};
}

export function getNetwork() {
    return async function(dispatch, getState) {
        try {
            const value = await AsyncStorage.getItem('@AppStore:current_network');
            if (value !== null){
                dispatch(changeNetwork(JSON.parse(value)));
            }
        } catch (error) {
            // Error retrieving data
        }
    }
}

export function selectNetwork(network) {
    return async function(dispatch, getState) {
        try {
            const value = await AsyncStorage.setItem('@AppStore:current_network', JSON.stringify(network));
            dispatch(changeNetwork(network));
        } catch (error) {
            // Error saving data
        }
    }
}

export function changeAppRoot(root) {
  return {type: types.ROOT_CHANGED, root: root};
}

function setUser(user) {
  return {type: types.USER_CHANGED, user: user};
}

export function showOnboarding(toggle) {
    return {type: types.SHOW_ONBOARDING, payload: toggle};
}

export function login(userData) {
  return async function(dispatch, getState) {

      UserController.getUser(userData.uid)
          .then((user) => {
             if(user) {
                 Analytics.setUserId(user._id);
                 //Analytics.logEvent('LOGIN');
                 //AsyncStorage.setItem('@User', JSON.stringify(user));
                 dispatch(setUser(user));
                 dispatch(getNetwork());
             }
          });

  };
}

export function logOut() {
    return async function(dispatch, getState) {
        firebase.auth().signOut();
    }
}