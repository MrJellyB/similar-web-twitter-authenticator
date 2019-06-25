const router = require('express').Router();
const authenticator = require('../actions/authenticator');
const tokenValidation = require('../middlewares/tokenValidation');
const tokenHeaderInjection = require('../middlewares/tokenHeaderInjection');

router.post('/register', function(req, res, next){
    authenticator.register(req.body, function(user) {
        res.set('token', user.token).status(201).send(user.id);
        next();
    },
    function(reason) {
        res.status(reason.code).send(reason.msg);
        next();
    },
    next);
});

router.get('/logout',tokenValidation(), function(req, res, next) {
    authenticator.logOut(function() {
        res.status(200).send();
        next();
    },
    next);
});

exports.router = router;