const router = require('express').Router();
const { models } = require('./db');
const { Product } = models;

module.exports = router;
//change this
router.get('/products', (res, req, next)=> {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});
