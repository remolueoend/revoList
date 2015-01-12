
'use strict';

var ip = require('ip'),
    sendgrid = require('sendgrid')('zumstrem@students.zhaw.ch', 'xd56Kh/mj');

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
