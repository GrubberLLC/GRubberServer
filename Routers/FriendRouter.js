const express = require('express');
const { FriendController } = require('../Controllers/FriendController');
const FriendRouter = express.Router();

FriendRouter.route('')
  .post(FriendController.createFriend)

FriendRouter.route('/:id')
  .get(FriendController.getFriendById)
  .put(FriendController.updateFriendById)
  .delete(FriendController.deleteFriendById)

module.exports = FriendRouter;