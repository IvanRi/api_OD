'use strict'
const express = require('express')
const api = express.Router()
var productsCtrl = require('./productController')

api.get('/', productsCtrl.listAllProduct)
api.get('/search_product', productsCtrl.searchProduct)
api.post('/', productsCtrl.addProduct)
api.delete('/', productsCtrl.deleteProduct)
api.put('/', productsCtrl.updateProduct)
api.put('/charge_products', productsCtrl.increasequantity)

module.exports = api