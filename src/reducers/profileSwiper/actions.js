import * as types from './actionTypes';

import ProfileSwiperController from '../../lib/controllers/profileSwiper';
import CardController from '../../lib/controllers/card';

export function loadProfiles(cardId) {
    return (dispatch, getState) => {
        const {app} = getState();

        dispatch(fetchProfiles());

        ProfileSwiperController.getProfilesThatSwipedRight(app.currentNetwork.id, cardId).then(
            (profiles) => {
                profiles.reverse();
                dispatch(receivedProfiles(profiles));
            }
        ).catch(
            (err) => {dispatch(loadingError(err))}
        );
    };
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