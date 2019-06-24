var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DB_URL
});

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
    getUserToken: function(userId, next, error) {
        admin.auth().createCustomToken(userId)
            .then(next)
            .catch(error);
    }
}