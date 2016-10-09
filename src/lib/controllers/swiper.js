
import Card from '../models/card';
import UserCardDeckPointer from '../models/userCardDeckPointer';

import Swipe from '../models/swipe';

import Helpers from './../utils/helpers';

class SwiperController {

    getCards(userId, networkId) {
        return new Promise((resolve, reject) => {
            Card.getCards(networkId, 20, this.getUserPointer(userId, networkId)).then(Helpers.objectToArray)
                .then(resolve).catch(reject);
        });
    }

    updateUserCardDeckPointer(userId, networkId, newPointer) {
        UserCardDeckPointer.update(`${userId}/${networkId}/pointer`, newPointer).then(
            (userCardDeckPointer) => {
                console.log(userCardDeckPointer);
            }
        ).catch((err) => { console.log(err) });
    }

    getUserPointer(userId, networkId) {
        UserCardDeckPointer.get(`${userId}/${networkId}/pointer`).then((pointer) => {return pointer})
            .catch((err) => { console.log(err) });
    }

    swipe(userId, networkId, cardId, decision) {
        return new Promise((resolve, reject) => {
            Swipe.set(`${networkId}/${cardId}/${userId}`, decision).then(resolve).catch(reject);
        });
    }

}

export default new SwiperController();