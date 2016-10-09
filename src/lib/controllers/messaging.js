
import Conversation from '../models/conversation.js';

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
    }
};

export default UserUtil;