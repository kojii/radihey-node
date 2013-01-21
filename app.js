
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , i18n = require('i18n');

i18n.configure({
    // setup some locales - other locales default to en silently
    locales:['ja', 'en'],

    // where to register __() and __n() to, might be "global" if you know what you are doing
    //register: global
});

var app = express();
app.locals({
  __i: i18n.__,
  __n: i18n.__n
});

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('AF940C4E-9B61-4558-8686-E065801A81D7'));
    app.use(express.session());
    app.use(i18n.init);
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public', compress: true }));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);


http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
