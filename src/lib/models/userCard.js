import Base from './base.js';

class UserCard extends Base {
    constructor() {
        super();
        this.model = 'user-cards';
    }
}
export default new UserCard();