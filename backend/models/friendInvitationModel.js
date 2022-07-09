const mongoose = require('mongoose');

const friendInvitationSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = FriendInvitation = mongoose.model('FriendInvitation', friendInvitationSchema);