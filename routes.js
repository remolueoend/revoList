
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
    var localAddr = ip.address();
    res.json({
        api: {
            url: 'http://' + localAddr + ':2000/:entity/:id?access_token=:accessToken',
            base: 'http://' + localAddr + ':2000{{path}}'
        }
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
