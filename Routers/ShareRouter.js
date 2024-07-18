const express = require('express');
const { ShareController } = require('../Controllers/ShareController');
const ShareRouter = express.Router();

ShareRouter.route('')
  .post(ShareController.createPlace)

ShareRouter.route('/:id')
  .get(ShareController.getPlaceById)
  .put(ShareController.updatePlaceById)
  .delete(ShareController.deletePlaceById)

ShareRouter.route('/check/:id')
  .get(ShareController.getPlaceByYelpId)

module.exports = ShareRouter;