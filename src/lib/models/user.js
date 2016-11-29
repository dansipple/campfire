import Base from './base.js';

class User extends Base {
    constructor() {
        super();
        this.model = 'users';
    }

    getByEmail(email) {
        return new Promise((resolve, reject) => {
            let ref = this.db();
            ref.orderByChild('email').equalTo(email);
            ref.once('value').then((data) => {
                resolve(data.val());
            })
            .catch(reject);
        });
    }
}
export default new User();