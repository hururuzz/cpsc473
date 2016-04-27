var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
    
server.listen(4001, function(){
    console.log('The server is listening on 4001');
});

io.sockets.on('connection', function(socket){
   socket.emit('news', 'Socket opened');
   socket.on('Add todo', function(data){
      console.log(data);
      io.sockets.emit('new list', data);
   });
});