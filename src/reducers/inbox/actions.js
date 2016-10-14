import * as types from './actionTypes';

import InboxController from '../../lib/controllers/inbox';

export function loadConversations() {
    return async (dispatch, getState) => {
        dispatch(fetchConversations());
        const {app} = getState();

        InboxController.getConversations(app.currentUser.id, app.currentNetwork.id).then(
            (conversations) => {
                console.log(conversations);
                conversations.reverse();
                dispatch(receivedConversations(conversations));
            }
        ).catch(
            (err) => {
                dispatch(loadingError(err))
            }
        );
    };
}

function fetchConversations() {
    return {type: types.FETCH_CONVERSATIONS};
}

function receivedConversations(conversations) {
    return {type: types.RECEIVED_CONVERSATIONS, conversations: conversations};
}

function loadingError(err) {
    return {type: types.LOADING_ERROR, error: err};
}