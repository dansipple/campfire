import firebase from '../firebase';

export default class Base {
    constructor(data) {
        this.fb = firebase.app;
        //this.getCurrentTime = firebase.getCurrentTime;
        this.model = null;
        this.data = data;
    }

    db(ref) {
        return this.fb.database().ref(this.model + (ref ? '/' + ref : ''));
    }

    get(path, orderBy) {
        return new Promise((resolve, reject) => {
            let ref = this.db(path ? path : '');
            if(orderBy) ref = ref.orderByChild(orderBy);
            ref.once('value').then((snapshot) => {resolve(snapshot.val())})
                .catch((err) => {reject(new Error('Read failed: ' + err.code))});
        });
    }

    update(path, data) {
        return new Promise((resolve, reject) => {
            data.updatedAt = firebase.getCurrentTime();
            let ref = this.db(path ? path : '');
            ref.update(data).then(() => {resolve('success')})
                .catch( (err) => {reject(new Error('Write failed: ' + err.code))});
        });
    }

    create(path, data) {
        return new Promise((resolve, reject) => {
            data.createdAt = firebase.getCurrentTime();
            data.updatedAt = firebase.getCurrentTime();
            let ref = this.db(path ? path : '');
            ref.push(data).then((ref) => {resolve(ref)})
                .catch( (err) => {reject(new Error('Write failed: ' + err.code))});
        });
    }

    set(path, data) {
        return new Promise((resolve, reject) => {
            data.createdAt = firebase.getCurrentTime();
            data.updatedAt = firebase.getCurrentTime();
            let ref = this.db(path ? path : '');
            ref.set(data).then((ref) => {resolve(ref)})
                .catch( (err) => {reject(new Error('Write failed: ' + err.code))});
        });
    }

};



