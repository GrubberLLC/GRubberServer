const express = require('express');
const { CommentController } = require('../Controllers/CommentController');
const CommentRouter = express.Router();

CommentRouter.route('')
  .post(CommentController.createComment)

CommentRouter.route('/:id')
  .get(CommentController.getCommentById)
  .put(CommentController.updateCommentById)
  .delete(CommentController.deleteProfileById)

module.exports = CommentRouter;