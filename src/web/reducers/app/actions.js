import * as types from './actionTypes';

import UserController from '../../../lib/controllers/user';

import firebase from '../../../lib/firebase';


export function appInitialized() {
    return async function(dispatch, getState) {
        // since all business logic should be inside redux actions
        // this is a good place to put your app initialization code

        firebase.auth().onAuthStateChanged(function(user) {
             if(user) {
                //dispatch(login(user));
             } else {
                //dispatch(changeAppRoot('login'));
             }
         });
    };
}

export function changeAppRoot(root) {
    return {type: types.ROOT_CHANGED, root: root};
}

export function setUser(user) {
    return {type: types.USER_CHANGED, user: user};
}

export function login(userData) {
    return async function(dispatch, getState) {

         UserController.getUser(userData.uid)
         .then((user) => {
             if(user) {
                //dispatch(setUser(user));
             }
         });
    };
 }


export function logOut() {
    return async function(dispatch, getState) {
        firebase.auth().signOut();
    }
}