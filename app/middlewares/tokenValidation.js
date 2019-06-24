const authenticator = require('../actions/authenticator');

const tokenValidation = function() {
    return function(req, res, next) {
        let bearertoken = req.headers['Authorization'] || req.headers['token'];
        
        const token = bearertoken.substring('Bearer '.length, bearertoken.length);

        authenticator.signInWithToken(token, next, function(error) {
            res.status(401).send("bla");
        });

        next();
    };
}

module.exports = tokenValidation;