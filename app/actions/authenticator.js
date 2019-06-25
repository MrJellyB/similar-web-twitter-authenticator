var firebase = require('firebase-admin');
var fireBaseIndex = require('../helpers/fireBaseIndex');

exports.register = function(userData, success, badRequest, error) {
    fireBaseIndex.checkIfUserExists(userData.email, 
        function(isExists) {
            if(isExists)
                badRequest({code: 409, msg: "User already exists"});

            // Try to create the user and return the token
            fireBaseIndex.addNewUser(
                userData, 
                function(userRecord) {
                    fireBaseIndex.getUserToken(userRecord.uid, success, error);
                }, 
                function(errMsg) {
                    if (errMsg.code === "auth/invalid-password")
                        badRequest({code: 400, msg: errMsg.message});
                    if (errMsg.code === "auth/invalid-email")
                        badRequest({code:400, msg: errMsg.message});

                    error();
                });            
        },
        error);        
};

exports.signInWithToken = function(token, success, error) {
    fireBaseIndex.tokenSignIn(token, success, error);
};

exports.getUserInfo = function(userId, success, error) {
    fireBaseIndex.getUserFromUid(userId, success, error);
}

exports.logOut = function(success, error) {
    fireBaseIndex.tokenSignOut(success, error);
}