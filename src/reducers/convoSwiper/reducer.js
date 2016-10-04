import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    cardDeck: [],
    activeCard: 0,
    isLoading: false,
    error: {}
});

export default function convoSwiper(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_CONVOS:
            return Object.assign({}, state, {
                isLoading: true
            });
        case types.RECEIVE_CONVOS:
            return Object.assign({}, state, {
                cardDeck: state.cardDeck.concat(action.cards),
                isLoading: false
            });
        case types.LOADING_ERROR:
            return Object.assign({}, state, {
                cardDeck: [],
                isLoading: false,
                error: action.error
            });
        case types.NEXT_CARD:
            return Object.assign({}, state, {
                activeCard: state.activeCard + 1
            });
        default:
            return state;
      }
}
