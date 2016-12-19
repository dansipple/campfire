import * as types from './actionTypes';

import ConnectController from '../../lib/controllers/connect';

export function loadPotentials() {
    return (dispatch, getState) => {
        const {app} = getState();

        dispatch(fetchPotentials());

        ConnectController.getPotentials(app.currentUser._id, app.currentNetwork._id).then(
            (potentials) => {
                potentials.reverse();
                dispatch(receivedPotentials(potentials));
            }
        ).catch(
            (err) => {dispatch(loadingError(err))}
        );
    };
}

function fetchPotentials() {
    return {type: types.FETCH_POTENTIALS};
}

function receivedPotentials(potentials) {
    return {type: types.RECEIVE_POTENTIALS, potentials: potentials};
}

function loadingError(err) {
    return {type: types.LOADING_ERROR, error: err};
}