'use strict';

const Order = require('./orderModel')
//product order
const ProductOrder = require('../ProductOrder/productOrderModel')
//product 
const Product = require('../product/productModel')

const listCurrentOrder = async function (req, res) {
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
    return res.send(orderList)
  } catch (e) {
    return res.status(400).send({ Error: "ha ocurrido un error en listAllOrder" + e })
  }
}

const listDeliveredOrders = async function (req, res) {
  try {
    const orderList = await Order.findAll({
      order: [["order_id", "ASC"]],
      where: {
        delivered: true
      },
      include: [{
        model: ProductOrder,
        as: "product_order",
        attributes: {
          exclude: ['id_product', 'order_id']
        }
      }]
    })
    return res.send(orderList)
  } catch (e) {
    return res.status(400).send({ Error: "ha ocurrido un error en listAllOrder" + e })
  }
}

const changeDeliveredStatus = async function (req, res) {
  try {
    await Order.update({
      delivered: true
    }, {
      where: {
        order_id: req.body.order_id
      }
    })
    return res.send({ message: 'Pedido marcado como entregado correctamente!' })
  } catch (e) {
    return res.status(400).send({ Error: 'Ha ocurrido un error en changeDeliveredStatus ' + e })
  }
}

const createOrder = async function (req, res) {
  const orderMaxId = await Product.sequelize.query(`SELECT MAX(order_id) FROM public."order"`)
  const newID = orderMaxId[0][0].max + 1
  try {
    await Order.create({
      user_id: req.body.user_id,
      order_id: newID,
      delivered: false,
      paused: false
    })
    for (let i = 0; req.body.product_order.length > i; i++) {
      const newProductOrder = req.body.product_order[i]
      await ProductOrder.create({
        order_id: newID,
        id_product: newProductOrder.id_product,
        product_name: newProductOrder.product_name,
        quantity_sell: newProductOrder.quantity_sell
      })
      await Product.update({
        quantity: newProductOrder.total_quantity - newProductOrder.quantity_sell
      }, {
        where: {
          id: newProductOrder.id_product
        }
      })
    }
    return res.status(200).send({ message: 'Orden creada con exito!' })
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en createOrder" + e })
  }
}

const deleteOrder = async function (req, res) {
  try {
    await Order.destroy({
      where: {
        order_id: req.body.order_id
      }
    })
    await ProductOrder.destroy({
      where: {
        order_id: req.body.order_id
      }
    })
    return res.send({ message: 'Orden eliminado correctamente!' })
  } catch (e) {
    return res.status(400).send({ Error: 'Ha ocurrido un error en deleteOrder: ' + e })
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
  listCurrentOrder,
  listDeliveredOrders,
  createOrder,
  deleteOrder,
  changeDeliveredStatus
}