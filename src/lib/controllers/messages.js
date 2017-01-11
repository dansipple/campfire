
import Message from '../models/message';
import Conversation from '../models/conversation';
import UserConversation from '../models/userConversation';

import FCMController from  '../../lib/controllers/fcm';

import Helpers from './../utils/helpers';

const MessagesController = {

    getMessages(networkId, conversationId) {
        return new Promise((resolve, reject) => {
            Message.get(`${networkId}/${conversationId}`, null, 100)
                .then(resolve).catch(reject);
        });
    },

    getMessagesStream(networkId, userId, conversationId, isUnread, cb) {
        Message.subscribe(`${networkId}/${conversationId}`, cb)
    },

    markAsRead(networkId, userId, otherUserId) {
        UserConversation.update(`${networkId}/${userId}/${otherUserId}`, {
            isUnread: false
        }, false);
    },

    sendMessage(networkId, conversationId, senderUser, text) {
        return new Promise((resolve, reject) => {
            Message.create(`${networkId}/${conversationId}`, {
                user: {_id: senderUser._id},
                text: text
            })
            .then(() => {
                Conversation.getOne(`${networkId}/${conversationId}`)
                .then((conversation) => {
                    if(conversation) {
                        delete conversation.participants[senderUser._id];
                        const otherUserId = Object.keys(conversation.participants)[0];

                        UserConversation.update(`${networkId}/${senderUser._id}/${otherUserId}`, {
                            lastMessage: text
                        })
                        .then(() => {
                            UserConversation.update(`${networkId}/${otherUserId}/${senderUser._id}`, {
                                lastMessage: text,
                                isUnread: true
                            });
                            
                            FCMController.sendMessageNotification(text, senderUser, otherUserId, networkId);

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