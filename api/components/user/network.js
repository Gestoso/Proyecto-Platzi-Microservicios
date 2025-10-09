const express = require('express');
const response = require('../../../network/response');
const controller = require('./index'); 
const { upsert } = require('../../../store/dummy');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert); 
 
function list(req, res) {
    controller.list()
    .then((lista) => {
    response.success(req, res, lista, 200);
    })
    .catch ((e) => {
    response.error(req, res, e.message || 'Internal error', 500);
  });
}

function get(req, res) {
  controller.get(req.params.id)
  .then((user) => {
    response.success(req, res, user, 200);
  })
  .catch((e) => {
    response.error(req, res, e.message, 500);
  });
}
/* function upsert(req, res) {
  controller.upsert(req.params)
  .then((user) => {
    response.success(req, res, user, 201);
  })
  .catch((e) => {
    response.error(req, res, e.message, 500);
  });
} */

module.exports = router;
