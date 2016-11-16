
import Network from '../models/network';
import NetworkAccessCode from '../models/networkAccessCode';
import User from '../models/user';
import UserNetwork from '../models/userNetwork';

import Helpers from './../utils/helpers';

const NetworksController = {

    getNetworks(userId) {
        return new Promise((resolve, reject) => {
            UserNetwork.get(userId).then(resolve).catch(reject);
        });
    },

    getNetwork(id) {
        return new Promise((resolve, reject) => {
            Network.getOne(id).then(resolve).catch(reject);
        });
    },

    createNetwork(userId, name, isPrivate) {
        return new Promise((resolve, reject) => {
            User.getOne(userId).then((creatorUserObj) => {

                const accessCode = Math.random().toString(36).substr(2, 5);
                const networkObj = {
                    name: name,
                    isPrivate: isPrivate,
                    accessCode: accessCode,
                    members: {
                        [userId]: {
                            first: creatorUserObj.first,
                            last: creatorUserObj.last,
                            isAdmin: true
                        }
                    }
                };
                // create network
                Network.create(null,
                    networkObj
                ).then((ref) => {
                    NetworkAccessCode.set(`${accessCode}/`, {
                        [ref.key]: true
                    }, false)
                    .then(() => {
                        // add user to network they created
                        UserNetwork.set(`${userId}/${ref.key}`, {
                            name: name,
                            isAdmin: true
                        })
                        .then(() => {
                            networkObj.accessCode = accessCode;
                            resolve(networkObj)
                        }).catch(reject);
                    }).catch(reject);
                }).catch(reject);
            }, (err) => {
                reject(err);
            });
        });
    },

    joinNetwork(userId, accessCode) {
        return new Promise((resolve, reject) => {
            NetworkAccessCode.getOne(accessCode).then((network) => {
                if(network) {
                    network = Object.keys(network)[0];
                    this.addUserToNetwork(userId, network)
                    .then(() => {
                        resolve();
                    })
                } else {
                    reject();
                }
            })
            .catch(() => {
                reject();
            });
        });
    },

    checkAccessCode(networkAccessCode, accessCode) {
        return new Promise((resolve, reject) => {
            networkAccessCode === accessCode ? resolve() : reject();
        });
    },

    addUserToNetwork(userId, networkId) {
        return new Promise((resolve, reject) => {
            Network.getOne(networkId).then((network) => {
                UserNetwork.set(`${userId}/${networkId}`, {
                    name: network.name,
                    isAdmin: false
                });
                User.getOne(userId).then((creatorUserObj) => {
                    Network.set(`${networkId}/members/${userId}`, {
                        first: creatorUserObj.first,
                        last: creatorUserObj.last
                    });
                });
                resolve(network);
            });
        });
    }
};

export default NetworksController;