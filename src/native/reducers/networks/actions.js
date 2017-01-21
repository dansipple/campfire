import * as types from './actionTypes';

import NetworksController from '../../../lib/controllers/networks';

export function loadNetworks() {
    return (dispatch, getState) => {
        const {app} = getState();

        dispatch(fetchNetworks());

        NetworksController.getNetworks(app.currentUser._id).then(
            (networks) => {
                dispatch(receivedNetworks(networks));
            }
        ).catch(
            (err) => {dispatch(loadingError(err))}
        );
    };
}

export function loadNetwork(id) {
    return (dispatch, getState) => {

        NetworksController.getNetwork(id)
            .then((network) => {
                dispatch(receivedAdminNetwork(network));
            })
            .catch(
                (err) => {dispatch(loadingError(err))}
            );
    }
}

function fetchNetworks() {
    return {type: types.FETCH_NETWORKS};
}

function receivedNetworks(networks) {
    return {type: types.RECEIVE_NETWORKS, networks: networks};
}

function receivedAdminNetwork(network) {
    return {type: types.RECEIVE_ADMIN_NETWORK, network: network};
}

function loadingError(err) {
    return {type: types.LOADING_ERROR, error: err};
}
