import * as types from './actionTypes';

import ProfileSwiperController from '../../lib/controllers/profileSwiper';

export function loadProfiles(cardId) {
    return (dispatch, getState) => {
        const {app} = getState();

        dispatch(fetchProfiles());

        ProfileSwiperController.getProfilesThatSwipedRight(app.currentNetwork.id, cardId).then(
            (profiles) => {
                dispatch(receivedProfiles(profiles));
            }
        ).catch(
            (err) => {dispatch(loadingError(err))}
        );
    };
}

export function connect(userId, cardId) {
    return (dispatch, getState) => {
        const {app} = getState();

        ProfileSwiperController.createConversation(app.currentNetwork.id, cardId, userId, app.currentUser.id)
            .then(() => {
                ProfileSwiperController.deleteSwipe(app.currentNetwork.id, cardId, userId)
                    .then(() => {
                        dispatch(checkIfOutOfProfiles(cardId));
                    });
            });
    }
}

export function pass(userId, cardId) {
    return (dispatch, getState) => {
        const {app} = getState();
        
        ProfileSwiperController.deleteSwipe(app.currentNetwork.id, cardId, userId).then(() => {
            dispatch(checkIfOutOfProfiles(cardId));
        });
    }
}

function checkIfOutOfProfiles(cardId) {
    return (dispatch, getState) => {
        const {profileSwiper, app} = getState();

        if(profileSwiper.activeProfile == profileSwiper.profiles.length - 1) {
            ProfileSwiperController.updateUserCard(app.currentUser.id, app.currentNetwork.id, cardId);
        }
        dispatch(nextProfile());
    }
}

function nextProfile() {
    return {type: types.NEXT_PROFILE};
}

export function updateActiveProfile(idx) {
    return {type: types.UPDATE_ACTIVE_PROFILE, index: idx};
}

function fetchProfiles() {
    return {type: types.FETCH_PROFILES};
}

function receivedProfiles(profiles) {
    return {type: types.RECEIVE_PROFILES, profiles: profiles};
}

function loadingError(err) {
    return {type: types.LOADING_ERROR, error: err};
}