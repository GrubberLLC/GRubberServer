const express = require('express');
const { LikesController } = require('../Controllers/LikesController');
const LikesRouter = express.Router();

LikesRouter.route('')
  .post(LikesController.createLike)

LikesRouter.route('post_user/:post_id/:user_id')
  .get(LikesController.getListByPostAndUser)

LikesRouter.route('/:id')
  .delete(LikesController.deleteLikeById)


module.exports = LikesRouter;