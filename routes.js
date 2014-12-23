
'use strict';

var ip = require('ip');

exports.index = function(req, res){
    res.render('layout');
};

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};

exports.config = function(req, res){
    var apiAddr = ip.address(),
        apiPort = '2000';
    if(process.env.OPENSHIFT_INTERNAL_IP || process.env.OPENSHIFT_NODEJS_IP){
        apiAddr = 'revolistapi-w1we.rhcloud.com';
        apiPort = 80;
    }

    res.json({
        api: {
            host: apiAddr,
            url: 'http://' + apiAddr + ':' + apiPort + '/:entity/:id?access_token=:accessToken',
            base: 'http://' + apiAddr + ':' + apiPort + '{{path}}'
        },
        FB: (function(){
            var appId = process.env.OPENSHIFT_INTERNAL_IP || process.env.OPENSHIFT_NODEJS_IP ?
                '1551776555034153' : '1574452112766597';

            return {
                appId: appId
            }
        })()
    });
};

exports.log = function(req, res, next){
    var level = req.param('level') || 'info';
    req.app.log.client.log(level, {
        component: req.body.component,
        msg: req.body.msg,
        stack: req.body.stack,
        agent: req.headers['user-agent'],
        remoteAddress: req.connection.remoteAddress
    });
    res.end();
};
