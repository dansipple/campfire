import * as types from './actionTypes';

import InboxController from '../../lib/controllers/inbox';

export function loadConversations() {
    return async (dispatch, getState) => {
        dispatch(fetchConversations());
        const {app} = getState();

        InboxController.getConversations(app.currentUser._id, app.currentNetwork._id).then(
            (conversations) => {
                conversations.reverse();
                dispatch(receivedConversations(conversations));
            }
        ).catch(
            (err) => {
                dispatch(loadingError(err))
            }
        );
/*
        InboxController.getInboxStream(app.currentUser._id, app.currentNetwork._id,
            (conversation, key) => {
                conversation._id = key;
                dispatch(receivedConversation(conversation));
            });
            */
    };
}

function fetchConversations() {
    return {type: types.FETCH_CONVERSATIONS};
}

function receivedConversation(conversation) {
    return {type: types.RECEIVED_CONVERSATION, conversation: conversation};
}

function receivedConversations(conversations) {
    return {type: types.RECEIVED_CONVERSATIONS, conversations: conversations};
}

function loadingError(err) {
    return {type: types.LOADING_ERROR, error: err};
}