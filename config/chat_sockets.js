
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

        //Receiving request for joining from emit function on client side
        socket.on('join_room', (data) => {
            console.log('joining request received', data);
            
            //Join the user to the chat room name "codeial", if not exists, create a chatroom and join
            socket.join(data.chatroom);                    // data.chatroom : Codeial
            
            //Acknowledging all members in the that chat room that new user joined
            io.in(data.chatroom).emit('user_joined', data); // emit back to the client
        });

         //Emitting receive messsage event when handled send message
         socket.on("send_message", function (data) {
            console.log("Send message request received");
            io.in(data.chatroom).emit("receive_message", data);
        });

    });
}