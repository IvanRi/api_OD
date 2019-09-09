'use strict';

var Order = require('./orderModel')
var ProductOrder = require('../ProductOrder/productOrderModel')

var listAllOrder = async function (req, res) {
  const orderList = await Order.findAll({
    where:{
      delivered: false
    },
    include:[{model:ProductOrder, as: "product_order", attributes:{exclude:['id_product','id_product_order', 'order_id']}}]
  })
  res.send({ data: orderList })
}

Order.hasMany(ProductOrder, {as: 'product_order', foreignKey:'order_id', targetKey:'order_id', sourceKey:'order_id'})
ProductOrder.belongsTo(Order, {as: 'order', foreignKey:'order_id', targetKey:'order_id', sourceKey:'order_id'})

module.exports = {
  listAllOrder
}