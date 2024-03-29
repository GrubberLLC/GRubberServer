const express = require('express');
const { PostCommentController } = require('../Controllers/PostCommentController');
const PostCommentRouter = express.Router();

PostCommentRouter.route('')
  .post(PostCommentController.createPost)

PostCommentRouter.route('/:id')
  .get(PostCommentController.getCommentByPostId)
  .delete(PostCommentController.deletePostById)


module.exports = PostCommentRouter;