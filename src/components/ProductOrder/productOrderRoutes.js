'use strict'

const express = require('express')
const api = express.Router()
var productOrderCtrl = require('./productOrderController')

api.post('/', productOrderCtrl.addProductOrder)

module.exports = api