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
      quantity: newProductOrder.quantity,
      id_product_order: newID
    })
    return res.send({ message: 'created' })
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en addProductOrder" + e })
  }
}

var getTotalProductSell = async function (req, res) {
  try {
    const totalProductSell = await ProductOrder.sequelize.query(`select SUM(quantity) as total_quantity, name, id FROM public.products group by id, name`)
    return res.send(totalProductSell[0])
  } catch (e) {
    return res.status(400).send({ Error: "Error en getTotalProductSell" + e })
  }
}

module.exports = {
  addProductOrder,
  getTotalProductSell
}