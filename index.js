// var server = require('http').createServer();

// var io = require('socket.io')(3000, {
//   path: '/voicer',
//   serveClient: false,
//   pingInterval: 10000,
//   pingTimeout: 5000,
//   cookie: false
// });

// io.on('connection', function (socket) {
//   console.log(socket.id + 'connected.')
// })

var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){
  console.log(socket.id + ' connected');
  io.emit('connected', socket.id + 'connected')
  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected')
    io.emit('disconnected', socket.id + ' disconnected')
  });
  socket.on('chat message', (msg) => {
    if (msg.trim())
      io.emit('chat message', msg.trim())
  });
  socket.on('voice message', (data) => {
    socket.broadcast.emit('voice message', data)
  });
  socket.on('voice data', (data) => {
    io.emit('voice data', data)
  })
});
http.listen(3000, function(){
  console.log('listening on *:3000')
});
