const express = require('express');
const { PostsControllet } = require('../Controllers/PostsControllet');
const PostRouter = express.Router();

PostRouter.route('')
  .post(PostsControllet.createPost)
  .get(PostsControllet.getAllPosts)

PostRouter.route('/:id')
  .get(PostsControllet.getPostById)
  .put(PostsControllet.updatePostById)
  .delete(PostsControllet.deletePostById)

PostRouter.route('/feed/:batch')
  .get(PostsControllet.getAllPostsInBatch)

PostRouter.route('/user/:id')
  .get(PostsControllet.getPostByUserId)

PostRouter.route('/friend/:id')
  .get(PostsControllet.getPostByFriendId)

PostRouter.route('/place/:id')
  .get(PostsControllet.getPostByPlaceId)

module.exports = PostRouter;