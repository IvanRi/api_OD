'use strict';

var Order = require('./orderModel')

var listAllOrder = async function (req, res) {
  const orderList = await Order.findAll()
  res.send({ data: orderList })
}

module.exports = {
  listAllOrder
}