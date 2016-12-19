import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    potentials: [],
    isLoading: false,
    error: {}
});

export default function connect(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_POTENTIALS:
            return Object.assign({}, state, {
                isLoading: true
            });
        case types.RECEIVE_POTENTIALS:
            return Object.assign({}, state, {
                potentials: action.potentials,
                isLoading: false
            });
        case types.LOADING_ERROR:
            return Object.assign({}, state, {
                potentials: [],
                isLoading: false,
                error: action.error
            });
        default:
            return state;
      }
}
