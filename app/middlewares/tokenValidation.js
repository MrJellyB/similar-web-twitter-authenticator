const authenticator = require('../actions/authenticator');

const tokenValidation = function() {
    return function(req, res, next) {
        let token = req.headers['Authorization'] || req.headers['token'];

        authenticator.signInWithToken(token, function(data) {
            console.log('success');

            next();
        }, function(error) {
            res.status(401).send(error.code);
            next(error);
        });
    };
}

module.exports = tokenValidation;