'use strict'
const express = require('express')
const api = express.Router()
var productsCtrl = require('./productController')

api.get('/', productsCtrl.listAllProduct)
api.post('/', productsCtrl.addProduct)
api.delete('/', productsCtrl.deleteProduct)

module.exports = api