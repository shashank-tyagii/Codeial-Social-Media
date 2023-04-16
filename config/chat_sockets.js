
module.exports.chatSockets = function(socketServer) {
    //Requiring socket.io for chat engine
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: ['http://localhost:8000']
        }
    });
     //Recieving request for connecting socket and acknowledging the connection
    io.sockets.on('connection', function (socket) {
        console.log('new connection received', socket.id);
        
        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
    });
}