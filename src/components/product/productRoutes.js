'use strict'
const express = require('express')
const api = express.Router()
const cors = require('cors')
var productsCtrl = require('./productController')
//middleware
api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


api.get('/',cors(), productsCtrl.listAllProduct)
api.post('/',cors(), productsCtrl.addProduct)
api.delete('/',cors(), productsCtrl.deleteProduct)

module.exports = api