const jwt = require('jsonwebtoken');

const verifySocketJwtToken = (socket, next) => {
    const token = socket.handshake.auth?.token;
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        socket.user = decoded;
    } catch (err) {
        const socketError = new Error('Not Authorized!');
        return next(socketError);
    }

    next();
}

module.exports = verifySocketJwtToken;