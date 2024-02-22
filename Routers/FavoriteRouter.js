const express = require('express');
const { FavoriteController } = require('../Controllers/FavoriteController');
const FavoriteRouter = express.Router();

FavoriteRouter.route('')
  .post(FavoriteController.createFavorite)

FavoriteRouter.route('/:id')
  .get(FavoriteController.getFavoriteById)
  .put(FavoriteController.updateFavoriteById)
  .delete(FavoriteController.deleteFavoriteById)

FavoriteRouter.route('/user/:id')
  .get(FavoriteController.getFavoriteByUserId)

module.exports = FavoriteRouter;