'use strict'
const express = require('express')
const api = express.Router()
const cors = require('cors')
var productsCtrl = require('./productController')
//middleware
api.options('*', cors())

api.get('/',cors(), productsCtrl.listAllProduct)
api.post('/',cors(), productsCtrl.addProduct)
api.delete('/',cors(), productsCtrl.deleteProduct)

module.exports = api