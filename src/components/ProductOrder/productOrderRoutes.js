'use strict'

const express = require('express')
const api = express.Router()
var productOrderCtrl = require('./productOrderController')

api.post('/', productOrderCtrl.addProductOrder)
// api.get('/', productOrderCtrl.getAllProductOrder)
api.get('/totals', productOrderCtrl.getTotalProductSell)

module.exports = api