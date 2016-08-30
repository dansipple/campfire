import firebase from '../firebase';

export default class Base {
    constructor(data) {
        this.fb = firebase;
        this.model = null;
        this.data = data;
    }

    db(ref) {
        return this.fb.database().ref(this.model + (ref ? '/' + ref : ''));
    }

    get(path) {
        return new Promise((resolve, reject) => {
            let ref = this.db(path ? path : '');
            ref.once('value').then((snapshot) => {resolve(snapshot.val())})
                .catch((err) => {reject(new Error('Read failed: ' + err.code))});
        });
    }

    update(path, data) {
        return new Promise((resolve, reject) => {
            let ref = this.db(path ? path : '');
            ref.update(data).then(() => {resolve('success')})
                .catch( (err) => {reject(new Error('Write failed: ' + err.code))});
        });
    }

    create(data) {
        if(data) {
            this.db().push(data, function(err) {
                if(err) return cb(new Error('Problem writing to ' + this.model + ' table.'), null);
                else cb(null, data);
            });
        }
    }
};



