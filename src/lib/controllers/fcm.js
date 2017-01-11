
import FCM from '../models/fcm';

import firebase from '../firebase';

import FCMClient from  '../../lib/fcm/client';

const FCMController = {

    getUserToken(userId) {
        return new Promise((resolve, reject) => {
            FCM.getOne(userId+'/token').then(resolve).catch(reject);
        });
    },

    setUserToken(userId, token) {
        return new Promise((resolve, reject) => {
            FCM.set(userId, {
                token: token
            }).then(resolve).catch(reject);
        });
    },

    sendMessageNotification(messageText, senderUser, recipientUserId, networkId) {
        return new Promise((resolve, reject) => {
            this.getUserToken(recipientUserId).then((token) => {
                FCMClient.sendMessageNotification(token,
                    messageText, senderUser.first + ' ' + senderUser.last, networkId);
                resolve();
            });
        });
    },

    sendPotentialNotification(senderUser, recipientUserId, networkId) {
        return new Promise((resolve, reject) => {
            this.getUserToken(recipientUserId).then((token) => {
                FCMClient.sendPotentialNotification(token,
                    senderUser.first + ' ' + senderUser.last, networkId);
                resolve();
            });
        });
    },
    sendConnectionNotification(recipientUserId, networkId) {
        return new Promise((resolve, reject) => {
            this.getUserToken(recipientUserId).then((token) => {
                FCMClient.sendConnectionNotification(token, networkId);
                resolve();
            });
        });
    }
};

export default FCMController;