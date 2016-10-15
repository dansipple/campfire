
import Card from '../models/card';
import UserCardDeckPointer from '../models/userCardDeckPointer';
import UserCard from '../models/userCard';

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
        UserCardDeckPointer.getOne(`${userId}/${networkId}/pointer`).then((pointer) => {return pointer})
            .catch((err) => { console.log(err) });
    }

    swipe(userId, networkId, card, decision) {
        return new Promise((resolve, reject) => {
            Swipe.set(`${networkId}/${card._id}/${userId}`, {
                interested: decision
            }).then(() => {
                if(decision) {
                    UserCard.update(`${networkId}/${card.creator._id}/${card._id}`, {
                        hasInterested: true
                    });
                }
            }).then(resolve).catch(reject);
        });
    }

}

export default new SwiperController();