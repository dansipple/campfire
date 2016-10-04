import * as types from './actionTypes';

import SwiperController from '../../lib/controllers/swiper';

export function loadConvos(userId, networkId) {
    return async (dispatch, getState) => {
        dispatch(fetchConvos());

        SwiperController.getCards(userId, networkId).then(
            (cards) => {dispatch(receivedConvos(cards))}
        ).catch(
            (err) => {dispatch(loadingError(err))}
        );
    };
}

export function fetchConvos() {
    return {type: types.FETCH_CONVOS};
}

export function receivedConvos(cards) {
    return {type: types.RECEIVE_CONVOS, cards: cards};
}

export function loadingError(err) {
    return {type: types.LOADING_ERROR, error: err};
}

export function nextCard() {
    return (dispatch, getState) => {
        const {convoSwiper, app} = getState();
        (convoSwiper.activeCard === convoSwiper.cardDeck.length - 1) ?
            dispatch(loadConvos(app.currentUser.id, app.currentNetwork.id)) : {type: types.NEXT_CARD};
    }
}
export function swipeLeft(userId, networkId) {
    return (dispatch, getState) => {

        dispatch(nextCard());
    }
}

export function swipeRight(userId, networkId) {
    return (dispatch, getState) => {

        dispatch(nextCard());
    }
}
