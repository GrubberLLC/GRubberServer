const express = require('express');
const { FriendController } = require('../Controllers/FriendController');
const FriendRouter = express.Router();

FriendRouter.route('')
  .post(FriendController.createFriend)

FriendRouter.route('/:id')
  .get(FriendController.getFriendById)
  .put(FriendController.updateFriendById)
  .delete(FriendController.deleteFriendById)

FriendRouter.route('/follower/:id')
  .get(FriendController.getFollowersByUserIs)

FriendRouter.route('/following/:id')
  .get(FriendController.getFollowingByUserIs)

FriendRouter.route('/accept/:id')
  .put(FriendController.acceptFriendRequest)

FriendRouter.route('/following-count/:id')
  .get(FriendController.getAllFollowingByUserIs)

FriendRouter.route('/follower-count/:id')
  .get(FriendController.getAllFollowersByUserIs)

FriendRouter.route('/relation/:userId/:friendId')
  .get(FriendController.getFriendByIds)

FriendRouter.route('/requests/:id')
  .get(FriendController.getFriendRequestsById)

module.exports = FriendRouter;