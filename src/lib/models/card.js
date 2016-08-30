import Base from './base.js';

class Card extends Base {
    constructor() {
        super();
        this.model = 'cards';
    }
    
    getCards(networkId, limit, deckPointer) {
        return new Promise((resolve, reject) => {
            let ref = this.db(networkId);
            ref.startAt(null, deckPointer).limitToFirst(limit).once('value')
                .then((snapshot) => {resolve(snapshot.val())})
                .catch((err) => {reject(new Error('Read failed: ' + err.code))});
        });
    }
}
export default new Card();