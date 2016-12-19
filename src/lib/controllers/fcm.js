
import FCM from '../models/fcm';

import firebase from '../firebase';

const FCMController = {

    getUserToken(userId) {
        return new Promise((resolve, reject) => {
            FCM.getOne(userId).then(resolve).catch(reject);
        });
    },

    setUserToken(userId, token) {
        return new Promise((resolve, reject) => {
            FCM.set(userId, {
                token: token
            }).then(resolve).catch(reject);
        });
    }
};

export default FCMController;