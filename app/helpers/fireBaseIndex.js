var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DB_URL
});

module.exports = {
    checkIfUserExists: async function(userEmail) {
        let userData = await admin.auth().getUserByEmail(userEmail);
        return (!!userData);
    },
    addNewUser: async function(email, firstName, lastName, password) {
        let createdUser = await admin.auth().createUser({
            email: email,
            displayName: firstName + ' ' + lastName,
            disabled: false,
            emailVerified: false,
            password: password
        });

        return createdUser;
    }
}