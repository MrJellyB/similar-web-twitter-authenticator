var admin = require('firebase-admin');
var firebase = require('firebase');

require('firebase/auth');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DB_URL
});

firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  })

module.exports = {
    checkIfUserExists: function(userEmail, next, error) {
        // let userData = await admin.auth().getUserByEmail(userEmail);
        // return (!!userData);

        admin.auth().getUserByEmail(userEmail)
            .then(function(userRecord) {
                next(true);
            })
            .catch(function(error) {
                console.log(error);
                if (error.code === "auth/user-not-found")
                    next(false);
                else
                    error();
            });
    },
    addNewUser: function({email, firstName, lastName, password}, next, error) {
         admin.auth().createUser({
            email: email,
            displayName: firstName + ' ' + lastName,
            disabled: false,
            emailVerified: false,
            password: password
        }).then(next).catch(error);
    },
    getUserToken: function(uid, next, error) {
        admin.auth().createCustomToken(uid)
            .then(function(userToken) {
                next({token: userToken, id: uid});
            })
            .catch(error);
        // firebase.auth().currentUser.getIdToken(true).then(
        //     function(userToken) {
        //         next({token: userToken, id: uid});
        //     })
        //     .catch(error);
    },
    getUserFromUid: function(userId, next, error) {
        admin.auth().getUser(userId).then(next).catch(error);
    },
    passwordSignIn: function(email, password, next, error) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(next).catch(error);
    },
    tokenSignIn: function(token, next, error) {
        firebase.auth().signInWithCustomToken(token).then(next).catch(error);
    },
    tokenSignOut: function(next, error) {
        firebase.auth().signOut().then(next).catch(error);
    }
}