
import User from '../models/user.js';

import NetworksController from './networks';

import firebase from '../firebase';

const UserUtil = {

    createUserAndAddToOrganization(userData, cb) {
        User.create(userData, function(err, user) {
            if (err) return cb(err, null);
            else {
                //OrganizationUtil.addUserToOrganization(organizationId, user.id, function(err, organization) {
                    return cb(err, user);
                //});
            }
        });
    },

    create(userData) {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
                .then((user) => {
                    let userObject = {
                        _id: user.uid,
                        email: userData.email,
                        first: userData.first,
                        last: userData.last,
                        title: userData.title,
                        college: userData.college
                    };

                    this.createUser(userObject);
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/weak-password') {
                        console.log('The password is too weak.');
                    } else {
                        console.log(errorMessage);
                    }
                    console.log(error);
                });
        })
    },

    createUser(userObject) {
        return new Promise((resolve, reject) => {
            User.set(userObject._id, userObject).then(() => {
                // add user to convos beta network
                NetworksController.addUserToNetwork(userObject._id, '-KPzFYEKdj3yRQn3teTP');

                resolve(userObject);
            });
        });
    },

    getUser(userId) {
        return new Promise((resolve, reject) => {
            User.getOne(userId)
                .then((user) => {
                    if(user) user._id = userId;
                    resolve(user);
                });
        });
    },

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            User.getByEmail(email)
                .then((user) => {
                    resolve(user);
                });
        });
    },

    updateUser(userId, userData) {
        return new Promise((resolve, reject) => {
            User.update(userId, userData)
                .then(() => {
                    resolve();
                });
        });
    },

    updateAvatar(url, userId) {
        return new Promise((resolve, reject) => {
            this.updateUser(userId, {avatar: url})
                .then(() => {
                    resolve();
                })
        });
    }
};

export default UserUtil;