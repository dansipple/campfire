import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBWllgaX60d8zejpjPrbopsLAVnpTFcKeM",
    authDomain: "convos-17643.firebaseapp.com",
    databaseURL: "https://convos-17643.firebaseio.com",
    storageBucket: "convos-17643.appspot.com"
};

export default firebase.initializeApp(firebaseConfig);