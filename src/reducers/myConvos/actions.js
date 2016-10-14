import * as types from './actionTypes';

import MyConvosController from '../../lib/controllers/myConvos';
import CardController from '../../lib/controllers/card';

export function loadConvos() {
    return (dispatch, getState) => {
        const {app} = getState();

        dispatch(fetchConvos());

        MyConvosController.getCards(app.currentUser.id, app.currentNetwork.id).then(
            (cards) => {
                cards.reverse();
                dispatch(receivedConvos(cards));
            }
        ).catch(
            (err) => {dispatch(loadingError(err))}
        );
    };
}

function fetchConvos() {
    return {type: types.FETCH_CONVOS};
}

function receivedConvos(convos) {
    return {type: types.RECEIVE_CONVOS, convos: convos};
}

function loadingError(err) {
    return {type: types.LOADING_ERROR, error: err};
}

export function createConvo(content, category) {
    return (dispatch, getState) => {
        const {app} = getState();

        CardController.create(app.currentUser.id, app.currentNetwork.id, content, category)
            .then(() => {
                dispatch(loadConvos());
            }).catch((err) => {dispatch(loadingError(err))}
        );
    }
}

export function updateConvo(cardId, content, category) {
    return (dispatch, getState) => {
        const {app} = getState();

        CardController.update(app.currentUser.id, app.currentNetwork.id, cardId, content, category)
            .then(() => {
                dispatch(loadConvos());
            }).catch((err) => {dispatch(loadingError(err))}
        );
    }
}

export function deleteConvo(cardId) {
    return (dispatch, getState) => {
        const {app} = getState();

        CardController.remove(app.currentUser.id, app.currentNetwork.id, cardId)
            .then(() => {
                dispatch(loadConvos());
            }).catch((err) => {dispatch(loadingError(err))}
        );
    }
}