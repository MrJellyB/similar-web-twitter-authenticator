const tokenHeaderInjection = function() {
    return function(req,res,next) {
        res.set('Authorization', req.headers['Authorization']);
        res.set('token', req.headers['token']);

        next();
    }
};

module.exports = tokenHeaderInjection;