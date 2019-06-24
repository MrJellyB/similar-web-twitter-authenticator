var firebase = require('firebase-admin');
var fireBaseIndex = require('../helpers/fireBaseIndex');

exports.register = function(userData, success, fail, error) {
    fireBaseIndex.checkIfUserExists(userData.email, 
        function(isExists) {
            if(isExists)
                fail({code: 409, msg: "User already exists"});

            // Try to create the user and return the token
            fireBaseIndex.addNewUser(
                userData, 
                function(userRecord) {
                    fireBaseIndex.getUserToken(userRecord.uid, success, error);
                }, 
                error);            
        },
        error);        
};