
import Card from '../models/card';
import UserCardDeckPointer from '../models/userCardDeckPointer';
import UserCard from '../models/userCard';
import Badge from '../models/badge';
import Swipe from '../models/swipe';
import Potential from '../models/potential';
import User from '../models/user';

import Helpers from './../utils/helpers';

const SwiperController = {

    getCards(userId, networkId) {
        return new Promise((resolve, reject) => {
            this.getUserPointer(userId, networkId)
                .then((pointer) => {
                    pointer = pointer ? pointer.pointer : '-A';

                    Card.getCards(networkId, 20, pointer)
                        .then(Helpers.objectToArray)
                        .then((cards) => {
                            const filteredCards = cards.filter((card) => {
                                return card.creator._id !== userId;
                            });
                            resolve(filteredCards)
                        }).catch(reject);
                }).catch(reject);
        });
    },

    updateUserCardDeckPointer(userId, networkId, newPointer) {
        return UserCardDeckPointer.update(`${networkId}/${userId}`, {
            pointer: newPointer
        });
    },

    getUserPointer(userId, networkId) {
        return UserCardDeckPointer.getOne(`${networkId}/${userId}`);
    },

    swipe(userId, networkId, card, nextCardKey, decision) {
        return new Promise((resolve, reject) => {
            Swipe.set(`${networkId}/${card._id}/${userId}`, {
                interested: decision
            }).then(() => {
                if(decision) {
                    User.getOne(userId).then((creatorUserObj) => {
                        Potential.update(`${networkId}/${card.creator._id}/${userId}`, {
                            user: {
                                first: creatorUserObj.first,
                                last: creatorUserObj.last,
                                title: creatorUserObj.title,
                                avatar: creatorUserObj.avatar || null
                            },
                            cards: {
                                [card._id]: card
                            }
                        });
                    });
                }
                const checkedNextCardKey = nextCardKey ? nextCardKey : (card._id.slice(0,-1) + 'z');
                this.updateUserCardDeckPointer(userId, networkId, checkedNextCardKey).catch(reject);
                resolve();
            }).catch(reject);
        });
    }

};

export default SwiperController;