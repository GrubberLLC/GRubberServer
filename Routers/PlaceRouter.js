const express = require('express');
const { PlaceController } = require('../Controllers/PlaceController');
const PlaceRouter = express.Router();

PlaceRouter.route('')
  .post(PlaceController.createPlace)

PlaceRouter.route('/:id')
  .get(PlaceController.getPlaceById)
  .put(PlaceController.updatePlaceById)
  .delete(PlaceController.deletePlaceById)

PlaceRouter.route('/check/:id')
  .get(PlaceController.getPlaceByYelpId)

module.exports = PlaceRouter;