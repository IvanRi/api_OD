var Router = require('express')
var productsCtrl = require('./productController')
var router = Router()

router.get('/', productsCtrl.listAllProduct)
router.post('/', productsCtrl.addProduct)
router.delete('/', productsCtrl.deleteProduct)

module.exports = router