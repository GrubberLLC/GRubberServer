const express = require('express');
const { CommentController } = require('../Controllers/CommentController');
const CommentRouter = express.Router();

CommentRouter.route('')
  .post(CommentController.createComment)

CommentRouter.route('/:id')
  .get(CommentController.getCommentById)
  .put(CommentController.updateCommentById)
  .delete(CommentController.deleteProfileById)

CommentRouter.route('/pl/:id')
  .get(CommentController.getCommentByPlId)

module.exports = CommentRouter;