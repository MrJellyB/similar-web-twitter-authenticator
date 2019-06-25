const router = require('express').Router();
const authenticator = require('../actions/authenticator');

router.post('/register', function(req, res, next){
    authenticator.register(req.body, function(user) {
        res.set('token', JSON.stringify(user.token)).status(201).send(user.id);
        next();
    },
    function(reason) {
        res.status(reason.code).send(reason.msg);
        next();
    },
    next);
});

exports.router = router;