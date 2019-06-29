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

router.get('/userToken', tokenValidation(), function(req,res,next) {
    res.status(200).send();
});

router.post('/login', function(req,res,next) {
    const {email, password} = req.body;

    // first we sign in with the credentials given
    authenticator.signInWithEmailAndPassword(email, password, 
        function(userCredentials) {

            // then we need to make a token and send back as a header
            authenticator.getUserToken(
                userCredentials.user.uid, 
                function(credentials) {
                    debugger;
                    const {uid,displayName,email} = userCredentials.user;

                    res.set('token', credentials.token).status(200).send({userId: uid, email: email, displayName: displayName});
                    next();
                },
                next);
        },
        function(error) {

            next(error);
        });
});

router.get('/logout',tokenValidation(), function(req, res, next) {
    authenticator.logOut(function() {
        res.status(200).send();
        next();
    },
    next);
});

exports.router = router;