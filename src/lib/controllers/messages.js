
import Message from '../models/message';
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

    getMessagesStream(networkId, conversationId, cb) {
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
                                lastMessage: text
                            })
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