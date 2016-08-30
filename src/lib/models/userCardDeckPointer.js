import Base from './base.js';

class UserCardDeckPointer extends Base {
    constructor() {
        super();
        this.model = 'user-card-deck-pointers';
    }

    update(networkId, limit, userPointer) {
        return new Promise(
            (resolve, reject) => {
                let ref = this.db(networkId);
                ref.startAt(null, userPointer).limitToFirst(limit).once("value", (snapshot) => {
                    resolve(snapshot.val());
                },  (errorObject) => {
                    reject('The read failed: ' + errorObject.code);
                });
            }
        );
    }
}
export default new UserCardDeckPointer();