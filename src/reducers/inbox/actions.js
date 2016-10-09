import * as types from './actionTypes';

import MessagingController from '../../lib/controllers/messaging';

export function loadConversations(userId, networkId) {
    return async (dispatch, getState) => {
        dispatch(fetchConversations());

        MessagingController.getConverstions(userId, networkId).then(
            (conversations) => {
                conversations.reverse();
                dispatch(receivedConversations(conversations));
            }
        ).catch(
            (err) => {dispatch(loadingError(err))}
        );
    };
}

export function fetchConversations() {
    return {type: types.FETCH_CONVERSTIONS};
}

export function receivedConversations(conversations) {
    return {type: types.RECEIVE_CONVERSTIONS, conversations: conversations};
}

export function loadingError(err) {
    return {type: types.LOADING_ERROR, error: err};
}