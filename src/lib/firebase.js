import * as firebase from 'firebase';

// Initialize Firebase

/*
// Prod
const firebaseConfig = {
    apiKey: "AIzaSyBWllgaX60d8zejpjPrbopsLAVnpTFcKeM",
    authDomain: "convos-17643.firebaseapp.com",
    databaseURL: "https://convos-17643.firebaseio.com",
    storageBucket: "convos-17643.appspot.com",
    messagingSenderId: "974457750012"
};
 */

// Dev
const firebaseConfig = {
    apiKey: "AIzaSyA8MtwDjPe6G7J6PTRcQ_dQyIFxM8Uv1qE",
    authDomain: "convos-dev.firebaseapp.com",
    databaseURL: "https://convos-dev.firebaseio.com",
    storageBucket: "convos-dev.appspot.com",
    messagingSenderId: "368343281439"
};


function getCurrentTime() {
    return firebase.database.ServerValue.TIMESTAMP;
}

export default {
    app: firebase.initializeApp(firebaseConfig),
    auth: firebase.auth,
    getCurrentTime: getCurrentTime,
    storage: firebase.storage()
}