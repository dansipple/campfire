import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    root: undefined, // 'login' / 'after-login',
    currentUser: {id: '-KPzFJ697NbkNZoHVBR7'},
    currentNetwork: {id: '-KPzFYEKdj3yRQn3teTP', name: 'Boston Beta'}
});

export default function app(state = initialState, action = {}) {
    switch (action.type) {
        case types.ROOT_CHANGED:
            return Object.assign({}, state, {
                root: action.root
            });
        case types.USER_CHANGED:
            return Object.assign({}, state, {
                currentUser: action.user
            });
        default:
            return state;
    }
}
