'use strict'
const express = require('express')
const api = express.Router()
var orderCtrl = require('./orderController')

api.get('/', orderCtrl.listAllOrder)
api.post('/', orderCtrl.createOrder)

module.exports = api