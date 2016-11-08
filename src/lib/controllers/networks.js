
import Network from '../models/network';
import UserNetwork from '../models/userNetwork';

import Helpers from './../utils/helpers';

const NetworksController = {

    getNetworks(userId) {
        return new Promise((resolve, reject) => {
            UserNetwork.get(userId).then(resolve).catch(reject);
        });
    }
};

export default NetworksController;