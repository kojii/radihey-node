
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , channel = require('./routes/channel')
  , http = require('http')
  , path = require('path')
  , i18n = require('i18n')
  , app = express()
  , server = http.createServer(app)
  , helpers = require('express-helpers')(app)
//tokenを作るメソッド
  , csrf = function(req, res, next) {
      //localsがexpress version3以降のhelperです。
      res.locals.token = req.session._csrf;
      next();
  }
// Socket.IO
  , io = require('socket.io').listen(server);


i18n.configure({
    // setup some locales - other locales default to en silently
    locales:['ja', 'en']

    // where to register __() and __n() to, might be "global" if you know what you are doing
    //register: global
});

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
    app.use(express.csrf());
    app.use(i18n.init);
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public', compress: true }));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/chs', channel.index);
app.get('/ch/:cid', channel.show);
app.get('/chs/new', csrf, channel.new);
app.get('/ch/:cid/edit', csrf, channel.edit);
app.post('/chs', channel.create);
app.put('/ch/:cid/update', channel.update);

var num_listeners = {};

var system = io.sockets.on('connection', function(socket){
  socket.emit('connected');

  // join
  socket.on('join', function(data){
    if (data.room) {
      socket.set('room', data.room);

      var room;
      socket.get('room', function(err, _room){
        room = _room;
      });
      if (!num_listeners[room]) { num_listeners[room] = 0 }
      num_listeners[room]++;

      socket.to(room).emit('joined', {num_listeners: num_listeners[room]})
      socket.broadcast.to(room).emit('another-connected', {num_listeners: num_listeners[room], room: room});
      socket.join(room);
    }
  });

  // disconnect
  socket.on('disconnect', function(data){
    var room;
    socket.get('room', function(err, _room){
      room = _room;
    });
    console.log('disconnect: ' + room);
    if (num_listeners[room] <= 1) {
      delete num_listeners[room]
    } else {
      num_listeners[room]--;
    }
    console.log('num_listeners: ' + num_listeners[room]);
    socket.broadcast.to(room).emit('another-disconnected', {num_listeners: num_listeners[room]});
  });

  socket.on('he', function(data){
    var room;
    socket.get('room', function(err, _room){
      room = _room;
    });
    socket.broadcast.to(room).emit('he-from-another');
  });

  socket.on('warai', function(data){
    var room;
    socket.get('room', function(err, _room){
      room = _room;
    });
    socket.broadcast.to(room).emit('warai-from-another');
  });

  socket.on('un', function(data){
    var room;
    socket.get('room', function(err, _room){
      room = _room;
    });
    socket.broadcast.to(room).emit('un-from-another');
  });

  socket.on('oh', function(data){
    var room;
    socket.get('room', function(err, _room){
      room = _room;
    });
    socket.broadcast.to(room).emit('oh-from-another');
  });

  socket.on('iine', function(data){
    var room;
    socket.get('room', function(err, _room){
      room = _room;
    });
    socket.broadcast.to(room).emit('iine-from-another');
  });

  socket.on('e', function(data){
    var room;
    socket.get('room', function(err, _room){
      room = _room;
    });
    socket.broadcast.to(room).emit('e-from-another');
  });
});

server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
