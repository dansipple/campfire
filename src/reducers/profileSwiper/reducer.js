import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    profiles: [],
    activeProfile: 0,
    isLoading: false,
    error: {}
});

export default function profileSwiper(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_PROFILES:
            return Object.assign({}, state, {
                isLoading: true
            });
        case types.RECEIVE_PROFILES:
            return Object.assign({}, state, {
                profiles: action.profiles,
                isLoading: false
            });
        case types.LOADING_ERROR:
            return Object.assign({}, state, {
                profiles: [],
                isLoading: false,
                error: action.error
            });
        default:
            return state;
      }
}
