import * as types from './actionTypes';

import MessagesController from '../../lib/controllers/messages';

export function loadMessages(conversationId, isUnread) {
    return async (dispatch, getState) => {
        dispatch(fetchMessages());
        const {app} = getState();

        MessagesController.getMessagesStream(app.currentNetwork._id, app.currentUser._id, conversationId, isUnread,
            (message, key) => {
                message._id = key;
                dispatch(receivedMessage(conversationId, message));
            });
    }
}

function fetchMessages() {
    return {type: types.FETCH_MESSAGES};
}

function receivedMessages(messages) {
    return {type: types.RECEIVED_MESSAGES, messages: messages};
}

function receivedMessage(conversationId, message) {
    return {type: types.RECEIVED_MESSAGE, message: message, conversationId: conversationId};
}

export function sendMessage(conversationId, text) {
    return async (dispatch, getState) => {
        const {app} = getState();
        MessagesController.sendMessage(app.currentNetwork._id, conversationId, app.currentUser._id, text)
        .catch((err) => {
            return dispatch(loadingError(err));
        });
    }
}

function loadingError(err) {
    return {type: types.LOADING_ERROR, error: err};
}