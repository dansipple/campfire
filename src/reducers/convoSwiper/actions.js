import * as types from './actionTypes';

import SwiperController from '../../lib/controllers/swiper';

export function loadConvos() {
    return async (dispatch, getState) => {
        const {app} = getState();

        dispatch(fetchConvos());

        SwiperController.getCards(app.currentUser.id, app.currentNetwork.id).then(
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

function checkPosition() {
    return (dispatch, getState) => {
        const {convoSwiper} = getState();

        if (convoSwiper.activeCard === convoSwiper.cardDeck.length - 1) {
            dispatch(loadConvos());
        }
    }
}

function nextCard() {
    return {type: types.NEXT_CARD};
}

export function swipe(cardId, decision) {
    return (dispatch, getState) => {
        const {app} = getState();

        SwiperController.swipe(app.currentUser.id, app.currentNetwork.id, cardId, decision).then(() => {
            dispatch(checkPosition());
            dispatch(nextCard());
        }).catch(
            (err) => {dispatch(loadingError(err))}
        );
    }
}