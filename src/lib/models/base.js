import firebase from '../firebase';

export default class Base {
    constructor(data) {
        this.model = null;
        this.data = data;
    }

    db(path) {
        const db = firebase.app.database();
        const ref = (path ? '/' + path : '');
        return db.ref(this.model + ref);
    }

    get(path, orderBy, limit) {
        return new Promise((resolve, reject) => {
            let ref = this.db(path ? path : '', orderBy);
            if(orderBy) ref = ref.orderByChild(orderBy);
            if(limit) ref = ref.limitToLast(limit);
            ref.once('value').then((data) => {
                const arr = [];
                data.forEach((snapshot) => {
                    arr.push(snapshot.val());
                });
                resolve(arr);
            })
            .catch((err) => {reject(new Error('Read failed: ' + err.code))});
        });
    }

    getOne(path, orderBy, limit) {
        return new Promise((resolve, reject) => {
            let ref = this.db(path ? path : '', orderBy);
            if(orderBy) ref = ref.orderByChild(orderBy);
            if(limit) ref = ref.limitToLast(limit);
            ref.once('value').then((data) => {
                resolve(data.val());
            })
            .catch(reject);
        });
    }

    subscribe(path, cb) {
        let ref = this.db(path ? path : '');
        ref.on('child_added', (snapshot) => {
            cb(snapshot.val(), snapshot.key);
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

    remove(path){
        return new Promise((resolve, reject) => {
            let ref = this.db(path ? path : undefined);
            ref.update({deletedAt: firebase.getCurrentTime()}).then(resolve).catch(reject);
        });
    }

    hardDelete(path){
        return new Promise((resolve, reject) => {
            let ref = this.db(path ? path : undefined);
            ref.set(null).then(resolve).catch(reject);
        });
    }

};



