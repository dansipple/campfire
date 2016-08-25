import Base from './base.js';

class User extends Base {
    constructor() {
        super();
        this.model = 'users';
    }
}
export default new User();