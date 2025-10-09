const express = require('express');
const response = require('../../../network/response');
const controller = require('./index'); 
const { upsert } = require('../../../store/dummy');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert); 
 
async function list(req, res, next) {
  try {
    const data = await controller.list();
    res.status(200).json(data);
  } catch (err) {
    next(err);  
  }
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
