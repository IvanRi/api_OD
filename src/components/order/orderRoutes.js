'use strict'
const express = require('express')
const api = express.Router()
var orderCtrl = require('./orderController')

api.get('/', orderCtrl.listCurrentOrder)
api.get('/delivered_orders', orderCtrl.listDeliveredOrders)
api.post('/', orderCtrl.createOrder)
api.delete('/', orderCtrl.deleteOrder)
api.put('/', orderCtrl.changeDeliveredStatus)

module.exports = api