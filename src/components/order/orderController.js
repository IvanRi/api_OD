'use strict';

var Order = require('./orderModel')
//product order
var ProductOrder = require('../ProductOrder/productOrderModel')
var productOrderCtrl = require('../ProductOrder/productOrderController')
//product 
var Product = require('../product/productModel')
var productCtrl = require('../product/productController')

var listAllOrder = async function (req, res) {
  try {
    const orderList = await Order.findAll({
      where: {
        delivered: false
      },
      include: [{ model: ProductOrder, as: "product_order", attributes: { exclude: ['id_product', 'id_product_order', 'order_id'] } }]
    })
    return res.send({ data: orderList })
  } catch (e) {
    return res.status(400).send({ Error: "ha ocurrido un error en listAllOrder" + e })
  }
}

const createOrder = async function (req, res) {
  try {
    const resOrder = await Order.create('order', {
      //object a crear
    })
    //productOrderCtrl.addProductOrder
    //productCtrl.decreaseCuantity
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en createOrder" + e })
  }
}

Order.hasMany(ProductOrder, { as: 'product_order', foreignKey: 'order_id', targetKey: 'order_id', sourceKey: 'order_id' })
ProductOrder.belongsTo(Order, { as: 'order', foreignKey: 'order_id', targetKey: 'order_id', sourceKey: 'order_id' })

module.exports = {
  listAllOrder,
  createOrder
}