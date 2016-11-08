
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
            Swipe.get(`${networkId}/${cardId}`).then(Helpers.filterDeleted)
                .then((swipes) => {
                    swipes.forEach((swipe) => {
                        if(swipe.interested === true) {
                            let user = this.getUserProfile(swipe._id, networkId);
                            promises.push(user);
                        }
                    });
                    Promise.all(promises).then((users) => {
                        resolve(users);
                    })
                }, reject)
        });
    }

    getUserProfile(userId, networkId) {
        return new Promise((resolve, reject) => {
            User.getOne(userId).then((user) => {
                if(user) {
                    user._id = userId;
                    UserCard.get(networkId+'/'+userId, null, 5).then(Helpers.filterDeleted)
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
            Swipe.remove(`${networkId}/${cardId}/${userId}`)
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
                                    this._createUserConversations(networkId, userId, initiatingUserId, refKey)
                                        .then(() => {
                                            resolve(refKey);
                                        }).catch(reject);
                                })
                                .catch(reject);
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

    _createUserConversations(networkId, userId, initiatingUserId, refKey) {
        return new Promise((resolve, reject) => {
            User.getOne(initiatingUserId)
                .then((user) => {
                    UserConversation.set(`${networkId}/${userId}/${initiatingUserId}`, {
                            lastMessage: null,
                            participant: user,
                            conversationId: refKey,
                            hasUnread: true
                        })
                        .catch(reject);
                })
                .catch(reject);

            User.getOne(userId)
                .then((user) => {
                    UserConversation.set(`${networkId}/${initiatingUserId}/${userId}`, {
                            lastMessage: null,
                            participant: user,
                            conversationId: refKey,
                            hasUnread: true
                        })
                        .catch(reject);
                })
                .catch(reject);

            resolve();
        });
    }
}

export default new ProfileSwiperController();