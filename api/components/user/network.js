const express = require('express');
const response = require('../../../network/response');
const controller = require('./index'); 

const router = express.Router();

router.get('/', async (req, res) => {

    controller.list()
    .then((lista) => {
    response.success(req, res, lista, 200);
    })
    .catch ((e) => {
    response.error(req, res, e.message || 'Internal error', 500);
  });
});

router.get('/:id', async (req, res) => {
  controller.get(req.params.id)
  .then((user) => {
    response.success(req, res, user, 200);
  })
  .catch((e) => {
    response.error(req, res, e.message, 500);
  });
});

module.exports = router;
