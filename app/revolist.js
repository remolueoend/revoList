var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    winston = require('winston'),
    ejs = require('ejs');

var app = express();

app.engine('html', require('ejs').renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/config', routes.config);
app.post('/log/:level', routes.log);
app.get('*', routes.index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    err.desc = 'Oops. You\'re on the wrong way here :(';
    next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    err.status = err.status || 500;
    err.message = err.message || "Internal server error";
    err.desc = err.desc || 'Oops. A wild error appeared while getting this page :(';
    if(err.status !== 410){
        res.status(err.status || 500);
    }

    res.render('error', {
        err: err
    });
});


app.log = {
    client: new winston.Logger({
        transports: [
            new winston.transports.Console()
        ]
    })
};


module.exports = app;
