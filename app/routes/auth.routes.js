const router = require('express').Router();
const authenticator = require('../actions/authenticator');

router.post('/register', function(req, res, next){
    authenticator.register(req.body, function(userIdToken) {
        res.set('token', JSON.stringify(userIdToken)).status(201).send('Created');
    },
    function(reason) {
        res.status(reason.code).send(reason.msg);
    },
    next);
});

exports.router = router;