var authenticator = require('../actions/authenticator');

const tokenHeaderInjection = function() {
    return function(req,res,next) {
        res.headers['Authorization'] = req.headers['Authorization'];
        res.headers['token'] = req.headers['token'];

        next();
    }
};

module.exports = tokenHeaderInjection;