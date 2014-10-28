
'use strict';

exports.index = function(req, res){
    res.render('layout');
};

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};

exports.config = function(req, res){
    res.json({
        api: {
            url: 'http://localhost:2000/:entity/:id?access_token=:accessToken',
            server: 'http://localhost:2000/'
        }
    });
};
