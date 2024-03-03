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

CommentRouter.route('/place/:id')
  .get(CommentController.getCommentByPlaceId)

module.exports = CommentRouter;