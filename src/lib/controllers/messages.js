
import Message from '../models/message';
import Badge from '../models/badge';
import Conversation from '../models/conversation';
import UserConversation from '../models/userConversation';

import Helpers from './../utils/helpers';

const MessagesController = {

    getMessages(networkId, conversationId) {
        return new Promise((resolve, reject) => {
            Message.get(`${networkId}/${conversationId}`, null, 100)
                .then(resolve).catch(reject);
        });
    },

    getMessagesStream(networkId, userId, conversationId, isUnread, cb) {
        if (isUnread) {
            Badge.getOne(`${userId}/${networkId}`)
                .then((badgeObj) => {
                    const currentCount = badgeObj && badgeObj.messages ? badgeObj.messages : 1;
                    Badge.update(`${userId}/${networkId}`, {
                        messages: currentCount - 1
                    });
                });
        }
        Message.subscribe(`${networkId}/${conversationId}`, cb)
    },

    sendMessage(networkId, conversationId, senderUserId, text) {
        return new Promise((resolve, reject) => {
            Message.create(`${networkId}/${conversationId}`, {
                user: {_id: senderUserId},
                text: text
            })
            .then(() => {
                Conversation.getOne(`${networkId}/${conversationId}`)
                .then((conversation) => {
                    if(conversation) {
                        delete conversation.participants[senderUserId];
                        const otherUserId = Object.keys(conversation.participants)[0];

                        UserConversation.update(`${networkId}/${senderUserId}/${otherUserId}`, {
                            lastMessage: text
                        })
                        .then(() => {
                            UserConversation.update(`${networkId}/${otherUserId}/${senderUserId}`, {
                                lastMessage: text,
                                isUnread: true
                            });
                            Badge.getOne(`${otherUserId}/${networkId}`)
                                .then((badgeObj) => {
                                    const currentCount = badgeObj && badgeObj.messages ? badgeObj.messages : 0;
                                    Badge.update(`${otherUserId}/${networkId}`, {
                                        messages: currentCount + 1
                                    });
                                });
                        }).catch(reject);
                    }
                }).catch(reject);
                resolve();
            })
            .catch(reject)
        });
    }
};

export default MessagesController;