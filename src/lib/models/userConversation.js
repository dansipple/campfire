import Base from './base.js';

class UserConversation extends Base {
    constructor() {
        super();
        this.model = 'user-conversations';
    }
}
export default new UserConversation();