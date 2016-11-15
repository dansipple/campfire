
import Network from '../models/network';
import NetworkAccessCode from '../models/networkAcessCode';
import User from '../models/user';
import UserNetwork from '../models/userNetwork';

import Helpers from './../utils/helpers';

const NetworksController = {

    getNetworks(userId) {
        return new Promise((resolve, reject) => {
            UserNetwork.get(userId).then(resolve).catch(reject);
        });
    },

    createNetwork(userId, name, isPrivate) {
        return new Promise((resolve, reject) => {
            User.getOne(userId).then((creatorUserObj) => {

                // create network
                Network.create(null,
                    {
                        name: name,
                        isPrivate: isPrivate,
                        members: {
                            [userId]: {
                                first: creatorUserObj.first,
                                last: creatorUserObj.last,
                                isAdmin: true
                            }
                        }
                    }
                ).then((ref) => {
                    const accessCode = Math.random().toString(36).substr(2, 5);
                    NetworkAccessCode.set(`${accessCode}/`, {
                        [ref.key]: true
                    });
                    // add user to network they created
                    UserNetwork.set(`${userId}/${ref.key}`, {
                        name: name,
                        isAdmin: true
                    })
                }).then(resolve).catch(reject);
            }, (err) => {
                reject(err);
            });
        });
    },

    joinNetwork(userId, accessCode) {
        return new Promise((resolve, reject) => {
            NetworkAccessCode.getOne(accessCode).then((network) => {
                if(network) {
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