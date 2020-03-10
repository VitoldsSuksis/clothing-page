import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD67L1Gvicl8RvdytD-gfMC1jU-_8g9PQc",
    authDomain: "crwn-db-cc172.firebaseapp.com",
    databaseURL: "https://crwn-db-cc172.firebaseio.com",
    projectId: "crwn-db-cc172",
    storageBucket: "crwn-db-cc172.appspot.com",
    messagingSenderId: "1085259331014",
    appId: "1:1085259331014:web:c7a74c698fd536744a2ec7",
    measurementId: "G-6N8SR3PV5H"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
