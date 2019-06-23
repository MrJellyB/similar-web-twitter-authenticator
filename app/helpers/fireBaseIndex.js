var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DB_URL
});

module.exports = {
    checkIfUserExists: function(userName) {
        
    },
    addNewUser(email, password) {

    }
}