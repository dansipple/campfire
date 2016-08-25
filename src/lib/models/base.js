import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDL5eYCRR10XXSqDHWvlm3RbUS4dv8FlsU",
    authDomain: "campfire-10fd2.firebaseapp.com",
    databaseURL: "https://campfire-10fd2.firebaseio.com",
    storageBucket: "campfire-10fd2.appspot.com"
};

export default class Base {
    constructor() {
        this.firebaseApp = firebase.initializeApp(firebaseConfig);
        this._model = null;
    }
    _db() {
        return this.firebaseApp.database().ref(this._model);
    }

    get(cb) {
        return cb(null, this._db());
    }

    getById(id, cb) {
        if(id) {
            return cb(null, this._db().child(id));
        }
    }

    create(data, cb) {
        if(data) {
            this._db().push(data, function(err) {
                if(err) return cb(new Error('Problem writing to ' + this._model + ' table.'), null);
                else cb(null, data);
            });
        }
    }

    update(data, cb) {
        if(data) {
            this._db().update(data, function(err) {
                if(err) return cb(new Error('Problem writing to ' + this._model + ' table.'), null);
                else cb(null, data);
            });
        }
    }
}



