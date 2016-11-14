import * as types from './actionTypes';

import {AsyncStorage} from 'react-native';

import UserController from '../../lib/controllers/user';

import firebase from '../../lib/firebase';

import {LoginManager} from 'react-native-fbsdk';

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

export function selectNetwork(network) {
    return {type: types.NETWORK_CHANGED, network: network};
}

export function changeAppRoot(root) {
  return {type: types.ROOT_CHANGED, root: root};
}

function setUser(user) {
  return {type: types.USER_CHANGED, user: user};
}

export function login(userData) {
  return async function(dispatch, getState) {

      UserController.getUser(userData.uid)
          .then((user) => {
             if(user) {
                 //AsyncStorage.setItem('@User', JSON.stringify(user));
                 dispatch(setUser(user));
             }
             else {
                 UserController.createUser(userData)
                     .then((user) => {
                         //AsyncStorage.setItem('@User', JSON.stringify(user));
                         dispatch(setUser(user));
                     });
             }
          });

    //dispatch(changeAppRoot('after-login'));
  };
}

export function logOut() {
    return async function(dispatch, getState) {
        firebase.auth().signOut().then(() => {
            LoginManager.logOut();
            //dispatch(changeAppRoot('login'));
        });
    }
}