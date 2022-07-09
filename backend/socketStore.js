let connectedUsers = new Map();

exports.connectedNewUsers = ({ socketId, userId }) => {
    connectedUsers.set( socketId, { userId });

    console.log(connectedUsers);
}

exports.disconnectedUser = (socketId) => {
    if(connectedUsers.has(socketId)) connectedUsers.delete(socketId);

    console.log(connectedUsers)

    return;
}