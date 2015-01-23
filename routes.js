
'use strict';

var ip = require('ip'),
    sendgrid = require('sendgrid')('zumstrem@students.zhaw.ch', 'xd56Kh/mj'),
    fs = require('fs'),
    path = require('path');

exports.index = function(req, res){
    res.render('layout');
};

exports.partials = function (req, res, next) {
    var name = req.params.name;
    if(fs.existsSync(path.join(__dirname, 'views/partials', name + '.html'))){
        res.render('partials/' + name);
    }else{
        var err = new Error('Not Found');
        err.status = 410;
        err.desc = 'Oops. You\'re on the wrong way here..';
        err.help = '<a href="/">Click here to get home save.</a>';
        next(err);
    }
};

exports.config = function(req, res){
    var apiAddr = ip.address(),
        apiPort = ':2000';
    if(process.env.OPENSHIFT_INTERNAL_IP || process.env.OPENSHIFT_NODEJS_IP){
        apiAddr = 'revolistapi-w1we.rhcloud.com';
        apiPort = '';
    }

    res.json({
        api: {
            host: apiAddr,
            url: 'http://' + apiAddr + apiPort + '/:entity/:id?access_token=:accessToken',
            base: 'http://' + apiAddr + apiPort + '{{path}}'
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
    if(level === 'logon'){
        sendgrid.send({
            to:       'r.zumsteg@icloud.com',
            from:     'info@revolist-w1we.rhcloud.com',
            subject:  'Account Logon',
            text:     'Account ' + req.body.user.fullName + ' (' + req.body.user._id + ') logged in successfully at ' + new Date().toString() + '.'
        }, function(err, json) {
            if(err){
                console.error('error sending mail:');
                console.error(err);
            }else{
                console.info('mail sent:');
                console.info(json);
            }
        });
    }else {
        req.app.log.client.log(level, {
            component: req.body.component,
            msg: req.body.msg,
            stack: req.body.stack,
            agent: req.headers['user-agent'],
            remoteAddress: req.connection.remoteAddress
        });
    }
    res.end();
};
