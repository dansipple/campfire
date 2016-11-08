
import User from '../models/user.js';

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

    createUser(userObject) {
        return new Promise((resolve, reject) => {
            const displayName = userObject.displayName.split(' '),
                firstName = displayName[0],
                lastName = displayName[displayName.length - 1];

            const newUser = {
                first: firstName,
                last: lastName,
                email: userObject.email,
                avatar: userObject.photoURL
            };
            User.set(userObject.uid, newUser).then(() => {
                newUser._id = userObject.uid;
                resolve(newUser);
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

    updateUser(userId, userData) {
        return new Promise((resolve, reject) => {
            User.update(userId, userData)
                .then(() => {
                    resolve();
                });
        });
    }
};

export default UserUtil;