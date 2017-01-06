import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    root: undefined, // 'login' / 'after-login',
    currentUser: {},
    currentNetwork: {},
    badges: {},
    showOnboarding: true
});

export default function app(state = initialState, action = {}) {
    switch (action.type) {
        case types.ROOT_CHANGED:
            return Object.assign({}, state, {
                root: action.root
            });
        case types.USER_CHANGED:
            return Object.assign({}, state, {
                currentUser: action.user,
                root: 'after-login'
            });
        case types.BADGES_CHANGED:
            return Object.assign({}, state, {
                badges: action.badges
            });
        case types.NETWORK_CHANGED:
            return Object.assign({}, state, {
                currentNetwork: action.network,
                root: 'after-login'
            });
        case types.SHOW_ONBOARDING:
            return Object.assign({}, state, {
                showOnboarding: action.payload
            });
        default:
            return state;
    }
}
