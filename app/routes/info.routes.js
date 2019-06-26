const router = require('express').Router();
const authenticator = require('../actions/authenticator');
const tokenHeaderInjection = require('../middlewares/tokenHeaderInjection');

router.get('/user',tokenHeaderInjection(), function(req,res,next) {
    authenticator.getUserInfo(req.query['userId'], 
        function(userInfo){
            res.status(200).send(userInfo);
            next();
        },
        function(err) {
            console.log(err);
            next(err);
        });
});

exports.router = router;