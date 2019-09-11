'use strict';

var Order = require('./orderModel')
//product order
var ProductOrder = require('../ProductOrder/productOrderModel')
//product 
var Product = require('../product/productModel')

var listAllOrder = async function (req, res) {
  try {
    const orderList = await Order.findAll({
      order: [["order_id", "ASC"]],
      where: {
        delivered: false
      },
      include: [{
        model: ProductOrder,
        as: "product_order",
        attributes: {
          exclude: ['id_product', 'order_id']
        }
      }]
    })
    return res.send({ data: orderList })
  } catch (e) {
    return res.status(400).send({ Error: "ha ocurrido un error en listAllOrder" + e })
  }
}

const createOrder = async function (req, res) {
  try {
    const resOrder = await Order.create({
      user_id: req.body.user_id,
      order_id: req.body.order_id,
      delivered: false,
      paused: false
    })
    for (let i = 0; req.body.product_order.length > i; i++) {
      const newProductOrder = req.body.product_order[i]
      await ProductOrder.create({
        order_id: req.body.order_id,
        id_product: newProductOrder.id_product,
        product_name: newProductOrder.product_name,
        cuantity_sell: newProductOrder.cuantity_sell
      })
        await Product.update({
          cuantity: newProductOrder.total_cuantity - newProductOrder.cuantity_sell
        },{
          where: {
            id: newProductOrder.id_product
          }
        })
    }
    return res.status(200).send({message: 'Orden creada con exito!'})
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en createOrder" + e })
  }
}

Order.hasMany(ProductOrder, {
  as: 'product_order',
  foreignKey: 'order_id',
  targetKey: 'order_id',
  sourceKey: 'order_id'
})
ProductOrder.belongsTo(Order, {
  as: 'order',
  foreignKey: 'order_id',
  targetKey: 'order_id',
  sourceKey: 'order_id'
})

module.exports = {
  listAllOrder,
  createOrder
}