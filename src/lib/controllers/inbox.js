
import UserConversation from '../models/userConversation';

import Helpers from './../utils/helpers';

const InboxController = {

    getConversations(userId, networkId) {
        return new Promise((resolve, reject) => {
            UserConversation.get(`${networkId}/${userId}`, 'updatedAt', 50)
                .then(resolve).catch(reject);
        });
    }
};

export default InboxController;