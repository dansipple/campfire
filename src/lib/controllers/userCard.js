
import UserCard from '../models/userCard';

import Helpers from './../utils/helpers';

class UserCardController {

    getCards(userId, networkId) {
        return new Promise((resolve, reject) => {
            UserCard.get(networkId+'/'+userId, 'updatedAt').then(Helpers.objectToArray).then(resolve).catch(reject);
        });
    }
}

export default new UserCardController();