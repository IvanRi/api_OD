'use strict';

var Order = require('./orderModel')
var ProductOrder = require('../ProductOrder/productOrderModel')

var listAllOrder = async function (req, res) {
  const orderList = await Order.findAll({
    where:{
      delivered: false
    }
  })
  res.send({ data: orderList })
}

Order.hasMany(ProductOrder)
ProductOrder.belongsTo(Order)

module.exports = {
  listAllOrder
}