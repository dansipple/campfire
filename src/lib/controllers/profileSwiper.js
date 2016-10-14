
import UserCard from '../models/userCard';
import Card from '../models/card';
import User from '../models/user';
import Conversation from '../models/conversation';
import UserConversation from '../models/userConversation';
import Message from '../models/message';
import Swipe from '../models/swipe';

import Helpers from './../utils/helpers';

class ProfileSwiperController {

    getProfilesThatSwipedRight(networkId, cardId) {
        return new Promise((resolve, reject) => {
            let promises = [];
            Swipe.get(`${networkId}/${cardId}`)
                .then((swipes) => {
                        for (let key in swipes) {
                            if(swipes[key] === true){
                                let user = this.getUserProfile(key, networkId);
                                promises.push(user);
                            }
                        }
                        Promise.all(promises).then((users) => {
                            resolve(users);
                        })
                }, reject)
        });
    }

    getUserProfile(userId, networkId) {
        return new Promise((resolve, reject) => {
            User.get(userId).then((user) => {
                if(user) {
                    user._id = userId;
                    UserCard.get(networkId+'/'+userId, 'updatedAt', 5).then(Helpers.filterDeleted)
                        .then((cards) => {
                            cards.reverse();
                            user.cards = cards;
                            resolve(user);
                        }).catch(reject);
                } else {
                    reject();
                }
            }, reject);
        });
    }
    
    deleteSwipe(networkId, cardId, userId) {
        return new Promise((resolve, reject) => {
            Swipe.hardDelete(`${networkId}/${cardId}/${userId}`)
                .then(resolve).catch(reject);
        });
    }

    createConversation(networkId, cardId, userId, initiatingUserId) {
        // create conversation and 2 userConversations
        return new Promise((resolve, reject) => {
            UserConversation.getOne(`${networkId}/${userId}/${initiatingUserId}`)
                .then((userConversation) => {
                    return new Promise((resolve, reject) => {
                        let refKey = null;
                        if (!userConversation) {
                            Conversation.create(networkId, {
                                    cardId: cardId,
                                    lastMessage: null,
                                    participants: {
                                        [initiatingUserId]: true,
                                        [userId]: true
                                    }
                                })
                                .then((ref) => {
                                    refKey = ref.key;
                                    User.getOne(initiatingUserId).then((user) => {
                                        UserConversation.set(`${networkId}/${userId}/${initiatingUserId}`, {
                                            lastMessage: null,
                                            participant: user,
                                            conversationId: refKey
                                        });
                                    }).catch(reject);
                                    User.getOne(userId).then((user) => {
                                        UserConversation.set(`${networkId}/${initiatingUserId}/${userId}`, {
                                            lastMessage: null,
                                            participant: user,
                                            conversationId: refKey
                                        });
                                    }).catch(reject);
                                    resolve(refKey);
                                });
                        } else {
                            refKey = userConversation.conversationId;
                            resolve(refKey);
                        }
                    }).then((refKey) => {
                        Card.getOne(`${networkId}/${cardId}`)
                            .then((card) => {
                                Message.create(`${networkId}/${refKey}`, {
                                    card: card,
                                    user: {_id: userId}, // syntax for format for gifted chat library
                                    text: null
                                }).catch(reject);
                            }).catch(reject);
                        resolve(); // TODO find better way to resolve this
                    }).catch(reject);
                }).catch(reject);
        });
    }

    updateUserCard(userId, networkId, cardId) {
        return new Promise((resolve, reject) => {
            UserCard.update(`${networkId}/${userId}/${cardId}`, {
                hasInterested: false
            }).then(resolve).catch(reject);
        });
    }
}

export default new ProfileSwiperController();