const express = require('express');
const { LikesController } = require('../Controllers/LikesController');
const LikesRouter = express.Router();

LikesRouter.route('')
  .post(LikesController.createLike)

LikesRouter.route('/:id')
  .get(LikesController.getListByPostId)
  .delete(LikesController.deleteLikeById)


module.exports = LikesRouter;