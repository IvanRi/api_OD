'use strict'

const express = require('express')
const api = express.Router()
const productOrderCtrl = require('./productOrderController')

api.post('/', productOrderCtrl.addProductOrder)
api.get('/totals', productOrderCtrl.getTotalProductSell)

module.exports = api