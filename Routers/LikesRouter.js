const express = require('express');
const { LikesController } = require('../Controllers/LikesController');
const LikesRouter = express.Router();

LikesRouter.route('')
  .post(LikesController.createLike)

LikesRouter.route('/post_user/:post_id/:user_id')
  .get(LikesController.getListByPostAndUser)

LikesRouter.route('/user/:id')
  .get(LikesController.getLikesByUserId)

LikesRouter.route('/:id')
  .get(LikesController.getListByPost)
  .delete(LikesController.deleteLikeById)


module.exports = LikesRouter;