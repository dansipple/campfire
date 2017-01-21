import * as types from './actionTypes';

import UserController from '../../../lib/controllers/user';

export function loadSettings() {
    return (dispatch, getState) => {
        const {app} = getState();

        dispatch(fetchSettings());

        UserController.getUser(app.currentUser._id).then(
            (user) => {
                dispatch(receivedSettings(user));
            }
        ).catch(
            (err) => {dispatch(loadingError(err))}
        );

    };
}

export function updateUserData(key, value) {
    return (dispatch, getState) => {
        const {settings} = getState();
        const userData = settings.userData;
        userData[key] = value;
        dispatch(receivedSettings(userData));
    }
}

export function saveSettings(key, value) {
    return (dispatch, getState) => {
        const {app} = getState();

        UserController.updateUser(app.currentUser._id, {
            [key]: value
        });
    }
}

function fetchSettings() {
    return {type: types.FETCH_SETTINGS};
}

function receivedSettings(user) {
    return {type: types.RECEIVED_SETTINGS, userData: user};
}

function loadingError(err) {
    return {type: types.LOADING_ERROR, error: err};
}