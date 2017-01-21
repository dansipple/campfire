import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    email: '',
    first: '',
    last: '',
    role: '',
    college: '',
    avatar: '',
    password: ''
});

export default function signup(state = initialState, action = {}) {
    switch (action.type) {
        case types.UPDATE_PROPERTY:
            return Object.assign({}, state,
                action.payload
            );
        default:
            return state;
    }
}
