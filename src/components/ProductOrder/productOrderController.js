var ProductOrder = require('./productOrderModel')

var addProductOrder = async function (req, res) {
  var newProductOrder = req.body
  var productIdMax = await ProductOrder.sequelize.query(`select max(id_product_order) from product_order where order_id = ${newProductOrder.order_id}`)
  var newID = productIdMax[0][0].max + 1
  try {
    await ProductOrder.create({
      order_id: newProductOrder.order_id,
      id_product: newProductOrder.id_product,
      product_name: newProductOrder.product_name,
      cuantity: newProductOrder.cuantity,
      id_product_order: newID
    })
    return res.send({ message: 'created' })
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en addProductOrder" + e })
  }
}

var getAllProductOrder = async function (req, res) {
  try {
    const productOrderList = await ProductOrder.findAll({
      where: {
        id_product: req.body.id_product
      }
    })
    return res.send({ data: productOrderList })
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en getAllProductOrder" + e })
  }
}

var getTotalProductSell = async function (req, res) {
  try {
    const totalProductSell = await ProductOrder.sequelize.query(`SELECT SUM(cuantity) as total_product, product_name FROM "product_order" group by id_product, product_name`)
    return res.send({ data: totalProductSell[0] })
  } catch (e) {
    return res.status(400).send({ Error: "Error en getTotalProduct" + e })
  }
}

module.exports = {
  addProductOrder,
  getAllProductOrder,
  getTotalProductSell
}