import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    networks: [],
    isLoading: false,
    error: {}
});

export default function networks(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_NETWORKS:
            return Object.assign({}, state, {
                isLoading: true
            });
        case types.RECEIVE_NETWORKS:
            return Object.assign({}, state, {
                networks: action.networks,
                isLoading: false
            });
        case types.LOADING_ERROR:
            return Object.assign({}, state, {
                networks: [],
                isLoading: false,
                error: action.error
            });
        default:
            return state;
      }
}
