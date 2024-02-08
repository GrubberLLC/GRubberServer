const express = require('express');
const { FavoriteController } = require('../Controllers/FavoriteController');
const FavoriteRouter = express.Router();

FavoriteRouter.route('')
  .post(FavoriteController.createFavorite)

FavoriteRouter.route('/:id')
  .get(FavoriteController.getFavoriteById)
  .put(FavoriteController.updateFavoriteById)
  .delete(FavoriteController.deleteFavoriteById)

module.exports = FavoriteRouter;