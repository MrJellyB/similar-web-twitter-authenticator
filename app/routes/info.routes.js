const router = require('express').Router();
const authenticator = require('../actions/authenticator');

router.get('/user', function(req,res,next) {
    authenticator.getUserInfo(req.query['userId'], 
        function(userInfo){
            res.set('token', JSON.stringify(userIdToken)).status(200).send(userInfo);
            next();
        },
        function(err) {
            console.log(err);
            next(err);
        });
});

exports.router = router;