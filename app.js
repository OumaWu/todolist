var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var todolist = [];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    console.log('An user is connected.');

    // Send the todolist to the just connected user
    socket.emit('todolist', todolist);

    // Synchronise other users' todolist 
    socket.on('update', (updatedList) => {
        todolist = updatedList;
        socket.broadcast.emit('update', todolist);
    });

    socket.on('disconnect', () => {
        console.log('An user is disconnected.');
    });

});


server.listen(8080);