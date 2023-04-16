class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        //Requesting for connecting socket to the chat server
        this.socket.on("connect", function () {
            console.log("Connection established using sockets");
        
        // Requesting to join the chatroom named "Codeial"
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });
        
            // Receiving response from the server name emit
            self.socket.on('user_joined', function (data) {
                console.log('a user joined', data);
            });
        });


    }
}