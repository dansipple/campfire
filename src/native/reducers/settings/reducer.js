import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    userData: {},
    isLoading: false,
    error: null
});

export default function settings(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_SETTINGS:
            return Object.assign({}, state, {
                isLoading: true
            });
        case types.RECEIVED_SETTINGS:
            return Object.assign({}, state, {
                userData: action.userData,
                isLoading: false
            });
        case types.LOADING_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.error
            });
        default:
            return state;
    }
}
