import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    messages: {},
    isLoading: false,
    error: {}
});

export default function messages(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_MESSAGES:
            return Object.assign({}, state, {
                isLoading: true
            });
        case types.RECEIVED_MESSAGES:
            return Object.assign({}, state, {
                messages: action.messages,
                isLoading: false
            });
        case types.RECEIVED_MESSAGE:
            const messagesObject = Object.assign({}, state.messages, {
                [action.conversationId]: [action.message].concat(state.messages[action.conversationId] || [])
            });
            return Object.assign({}, state, {
                messages: messagesObject,
                isLoading: false
            });
        case types.LOADING_ERROR:
            return Object.assign({}, state, {
                messages: [],
                isLoading: false,
                error: action.error
            });
        default:
            return state;
      }
}
