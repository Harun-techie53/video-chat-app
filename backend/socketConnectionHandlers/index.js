const socketStore = require('../socketStore');

exports.newConnectionHandler = (socket, io) => {
    const userDetails = socket.user;

    socketStore.connectedNewUsers({
        socketId: socket.id,
        userId: userDetails.userId
    });
}

exports.disconnectionHandler = (socket) => {
    const socketId = socket.id;

    socketStore.disconnectedUser(socketId);
}