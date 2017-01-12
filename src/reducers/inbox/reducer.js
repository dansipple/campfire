import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    conversations: [],
    isLoading: false,
    error: {}
});

export default function inbox(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_CONVERSATIONS:
            return Object.assign({}, state, {
                isLoading: true
            });
        case types.RECEIVED_CONVERSATION:
            return Object.assign({}, state, {
                conversations: [action.conversation].concat(state.conversations || []),
                isLoading: false
            });
        case types.RECEIVED_CONVERSATIONS:
            return Object.assign({}, state, {
                conversations: action.conversations,
                isLoading: false
            });
        case types.LOADING_ERROR:
            return Object.assign({}, state, {
                conversations: [],
                isLoading: false,
                error: action.error
            });
        default:
            return state;
      }
}
