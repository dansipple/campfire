
import Potential from '../models/potential';
import Message from '../models/message';
import Conversation from '../models/conversation';
import User from '../models/user';
import UserConversation from '../models/userConversation';

import FCMController from  '../../lib/controllers/fcm';

import Helpers from './../utils/helpers';

const ConnectController = {

    getPotentials(userId, networkId) {
        return new Promise((resolve, reject) => {
            Potential.get(`${networkId}/${userId}`, null, 50)
                .then(resolve).catch(reject);
        });
    },

    connect(userId, networkId, potentialData) {
        return new Promise((resolve, reject) => {
            _createConversation(networkId, potentialData.cards, userId, potentialData._id)
                .then((conversation) => {
                    _deletePotential(userId, networkId, potentialData._id)
                        .then(() => resolve(conversation));
                }).catch(reject);
        });
    },

    pass(userId, networkId, potentialData) {
        return new Promise((resolve, reject) => {
            _deletePotential(userId, networkId, potentialData._id).then(resolve).catch(reject);
        });
    }
};

// private functions

function _createConversation(networkId, cards, userId, otherUserId) {
    // create conversation and 2 userConversations
    return new Promise((resolve, reject) => {
        UserConversation.getOne(`${networkId}/${userId}/${otherUserId}`)
            .then((userConversation) => {
                return new Promise((resolve, reject) => {
                    let refKey = null;
                    if (!userConversation) {
                        Conversation.create(networkId, {
                                lastMessage: 'You matched on a convo!',
                                participants: {
                                    [otherUserId]: true,
                                    [userId]: true
                                }
                            })
                            .then((ref) => {
                                refKey = ref.key;
                                _createUserConversations(networkId, userId, otherUserId, refKey)
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
                    Helpers.objectToArray(cards)
                        .then((cards) => {
                            cards.forEach((card) => {
                                Message.create(`${networkId}/${refKey}`, {
                                    card: card,
                                    user: {_id: userId}, // syntax for format for gifted chat library
                                    text: null
                                }).catch(reject);
                            });
                            Conversation.getOne(`${networkId}/${refKey}`)
                                .then((conversation) => {
                                    if(conversation) {
                                        delete conversation.participants[userId];
                                        const otherUserId = Object.keys(conversation.participants)[0];

                                        UserConversation.update(`${networkId}/${userId}/${otherUserId}`, {
                                                lastMessage: 'You connected on a Convo!'
                                            })
                                            .then(() => {
                                                UserConversation.update(`${networkId}/${otherUserId}/${userId}`, {
                                                    lastMessage: 'You connected on a Convo!',
                                                    isUnread: true
                                                });

                                                FCMController.sendConnectionNotification(otherUserId, networkId);

                                            }).catch(reject);
                                    }
                                }).catch(reject);
                            resolve();
                        });
/*
                    Card.getOne(`${networkId}/${cardId}`)
                        .then((card) => {
                            Message.create(`${networkId}/${refKey}`, {
                                card: card,
                                user: {_id: userId}, // syntax for format for gifted chat library
                                text: null
                            }).catch(reject);
                        }).catch(reject);
*/
                    resolve(); // @TODO find better way to resolve this
                }).catch(reject);
            }).catch(reject);
    });
}

function _createUserConversations(networkId, userId, otherUserId, refKey) {
    return new Promise((resolve, reject) => {
        User.getOne(otherUserId)
            .then((user) => {
                UserConversation.set(`${networkId}/${userId}/${otherUserId}`, {
                        lastMessage: 'You matched on a convo!',
                        participant: user,
                        conversationId: refKey,
                        isUnread: true
                    })
                    .catch(reject);
            })
            .catch(reject);

        User.getOne(userId)
            .then((user) => {
                UserConversation.set(`${networkId}/${otherUserId}/${userId}`, {
                        lastMessage: null,
                        participant: user,
                        conversationId: refKey,
                        isUnread: true
                    })
                    .catch(reject);
            })
            .catch(reject);

        resolve();
    });
}

function _deletePotential(userId, networkId, otherUserId) {
    return new Promise((resolve, reject) => {
        Potential.hardDelete(`${networkId}/${userId}/${otherUserId}`)
            .then(resolve).catch(reject);
    });
}

export default ConnectController;