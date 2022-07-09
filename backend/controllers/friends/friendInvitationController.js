const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitationModel');

exports.inviteFriendRequest = async (req, res) => {
    const { targetMailAddress } = req.body;
    const { userId, mail: userEmail } = req.user;
    try {
        //if targeted email address hasn't found
        const targetEmailAddressExist = await User.findOne({
            mail: targetMailAddress
        });

        if(!targetEmailAddressExist) throw new Error('Requested email address does not exist!');

        //if targeted email address is the same email address of the current user
        if(targetMailAddress.toLowerCase() === userEmail.toLowerCase()) throw new Error('Requested email address and current user email address are same!');

        //if current user already sent friend request to the targeted email address
        const targetUser = await User.findOne({ mail: targetMailAddress.toLowerCase() });

        const friendInvitationSentAlready = await FriendInvitation.findOne({
            senderId: userId,
            recieverId: targetUser.id
        });

        if(friendInvitationSentAlready) throw new Error('Friend invitation already sent to the requested email address!');

        //if current user and targeted user are already friends
        const isAlreadyFriend = targetUser.friends.find((userId) => userId.toString() === userId.toString());

        if(isAlreadyFriend) throw new Error('Requested user and current user are already friends!');

        //create friend invitation 
        await FriendInvitation.create({
            senderId: userId,
            recieverId: targetUser.id
        });

        res.status(200).json({
            status: 'success',
            message: 'Friend Invitation Sent'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.getUserFriendInvitations = async (req, res) => {
    try {
        const friendInvitations = await FriendInvitation.find({
            recieverId: req.user.userId
        });

        res.status(200).json({
            status: 'success',
            results: friendInvitations.length,
            data: {
                friendInvitations
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.acceptFriendInvitation = async (req, res) => {
    try {
        const friendInvitation = await FriendInvitation.findById(req.params.friendInvitationId);

        const currentUser = await User.findById(req.user.userId);

        if(currentUser) currentUser.friends.push({
            userId: friendInvitation.senderId
        });

        await FriendInvitation.findByIdAndDelete(req.params.friendInvitationId);


        res.status(200).json({
            status: 'success',
            message: 'Friend invitation accepted successfully!'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}