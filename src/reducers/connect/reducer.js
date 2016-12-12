import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    convos: [],
    isLoading: false,
    error: {}
});

export default function myConvos(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_CONVOS:
            return Object.assign({}, state, {
                isLoading: true
            });
        case types.RECEIVE_CONVOS:
            return Object.assign({}, state, {
                convos: action.convos,
                isLoading: false
            });
        case types.LOADING_ERROR:
            return Object.assign({}, state, {
                convos: [],
                isLoading: false,
                error: action.error
            });
        default:
            return state;
      }
}
