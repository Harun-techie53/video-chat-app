const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation');
const friendControllers = require('../controllers/friends/friendInvitationController');
const auth = require('../middleware/auth');

router.post('/invite', auth, friendControllers.inviteFriendRequest);
router.get('/', auth, friendControllers.getUserFriendInvitations);
router.delete('/accept/:friendInvitationId', auth, friendControllers.acceptFriendInvitation);

module.exports = router;