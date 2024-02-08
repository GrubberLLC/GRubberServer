const express = require('express');
const { PlaceInListController } = require('../Controllers/PlaceInListController');
const PlaceInListRouter = express.Router();

PlaceInListRouter.route('')
  .post(PlaceInListController.createPlaceInList)

PlaceInListRouter.route('/:id')
  .get(PlaceInListController.getPlaceInListById)
  .put(PlaceInListController.updatePlaceInListById)
  .delete(PlaceInListController.deletePlaceInListById)

module.exports = PlaceInListRouter;