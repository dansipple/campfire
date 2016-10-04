import * as types from './actionTypes';

import UserCardController from '../../lib/controllers/userCard';

export function loadConvos(userId, networkId) {
    return async (dispatch, getState) => {
        dispatch(fetchConvos());

        UserCardController.getCards(userId, networkId).then(
            (cards) => {
                cards.reverse();
                dispatch(receivedConvos(cards));
            }
        ).catch(
            (err) => {dispatch(loadingError(err))}
        );
    };
}

export function fetchConvos() {
    return {type: types.FETCH_CONVOS};
}

export function receivedConvos(convos) {
    return {type: types.RECEIVE_CONVOS, convos: convos};
}

export function loadingError(err) {
    return {type: types.LOADING_ERROR, error: err};
}