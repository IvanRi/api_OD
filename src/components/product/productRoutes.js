'use strict'
const express = require('express')
const api = express.Router()
const productsCtrl = require('./productController')

api.get('/', productsCtrl.listAllProduct)
api.post('/search_product', productsCtrl.searchProduct)
api.post('/', productsCtrl.addProduct)
api.delete('/', productsCtrl.deleteProduct)
api.put('/', productsCtrl.updateProduct)
api.put('/charge_products', productsCtrl.increaseQuantity)
api.put('/decrease_products', productsCtrl.decreaseQuantity)

module.exports = api