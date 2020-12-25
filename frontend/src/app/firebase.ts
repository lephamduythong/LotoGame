import firebase from 'firebase/app';
import 'firebase/database'
export const DATA_STRUCTURE = {
    "number-online": 0,
    "name": '',
    "is-host": false,
    "other-player": [
        {
            "name": '',
            "is-host": false,
            "current-loto-table": [
                ['0','0','0','0','0','0','0','0','0'],
                ['0','0','0','0','0','0','0','0','0'],
                ['0','0','0','0','0','0','0','0','0'],
                ['0','0','0','0','0','0','0','0','0'],
                ['0','0','0','0','0','0','0','0','0'],
                ['0','0','0','0','0','0','0','0','0'],
                ['0','0','0','0','0','0','0','0','0'],
                ['0','0','0','0','0','0','0','0','0'],
                ['0','0','0','0','0','0','0','0','0'],
            ],
            "not-interact": 0
        }
    ],
}
export function connectAndInit() {
    let app = firebase.initializeApp({
        databaseURL: "https://lotogame-deb16-default-rtdb.firebaseio.com",
        authDomain: "lotogame-deb16.firebaseapp.com",
        apiKey: "AIzaSyAZnuODonoFwHxdvDOH4FemCl1ZxNi0Hxs",
        storageBucket: "",
        messagingSenderId: "312217836160",
    })
    let rootDbRef = firebase.database(app).ref('/')
    rootDbRef.child('/app').once('value', (snap) => {
        if (!snap.val()) {
            rootDbRef.child('app').set(DATA_STRUCTURE)
        }
    })
    return rootDbRef.child('/app')
}



