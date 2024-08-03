const express = require('express');
const { ListController } = require('../Controllers/ListController');
const ListRouter = express.Router();

ListRouter.route('')
  .post(ListController.createList)

ListRouter.route('/:id')
  .get(ListController.getListById)
  .put(ListController.updateListById)
  .delete(ListController.deleteListById)

ListRouter.route('/user/:id')
  .get(ListController.getListByUserId)

ListRouter.route('/user/public/:id')
  .get(ListController.getListByUserId)

module.exports = ListRouter;