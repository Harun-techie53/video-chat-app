const verifySocketJwtToken = require('./middleware/authSocket');
const { newConnectionHandler, disconnectionHandler } = require('./socketConnectionHandlers');

exports.registerSocketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.use((socket, next) => {
        verifySocketJwtToken(socket, next);
    });

    io.on('connection', (socket) => {
        //new connection handler
        newConnectionHandler(socket, io);

        //disconnect user handler
        socket.on('disconnect', () => {
            disconnectionHandler(socket);
        });
    });
}