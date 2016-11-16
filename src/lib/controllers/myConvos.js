
import UserCard from '../models/userCard';

import Helpers from './../utils/helpers';

class MyConvosController {

    getCards(userId, networkId) {
        return new Promise((resolve, reject) => {
            UserCard.get(networkId+'/'+userId).then(Helpers.filterDeleted)
                .then(resolve).catch(reject);
        });
    }

    subscribe(userId, networkId, cb) {
        return UserCard.subscribe(networkId+'/'+userId, cb);
    }
}

export default new MyConvosController();