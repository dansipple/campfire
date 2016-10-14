import * as types from './actionTypes';

import MessagesController from '../../lib/controllers/messages';

export function loadMessages(conversationId) {
    return async (dispatch, getState) => {
        dispatch(fetchMessages());
        const {app} = getState();

        /*
        MessagesController.getMessages(app.currentNetwork.id, conversationId).then(
            (messages) => {
                messages.reverse();
                dispatch(receivedMessages(messages));
            }
        ).catch(
            (err) => {
                console.log(err);
                dispatch(loadingError(err))
            }
        );*/

        MessagesController.getMessagesStream(app.currentNetwork.id, conversationId,
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
        MessagesController.sendMessage(app.currentNetwork.id, conversationId, app.currentUser.id, text)
        .catch((err) => {
            return dispatch(loadingError(err));
        });
    }
}

function loadingError(err) {
    return {type: types.LOADING_ERROR, error: err};
}