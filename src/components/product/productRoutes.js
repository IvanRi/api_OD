var Router = require('express')
var listAllProduct = require('./productController')
var router = Router()

router.get('/', listAllProduct)

module.exports = router