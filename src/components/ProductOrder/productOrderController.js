var ProductOrder = require('./productOrderModel')

var addProductOrder = async function (req, res) {
  var newProductOrder = req.body
  // var productIdMax = await ProductOrder.sequelize.query("select max(id) from products")
  // var newID = productIdMax[0][0].max+1
  try {
    await ProductOrder.create({
      order_id: newProductOrder.order_id,
      id_product: newProductOrder.id_product,
      product_name: newProductOrder.product_name,
      cuantity: newProductOrder.cuantity
    })
    res.send({ message: 'created' })
  } catch (e) {
    return res.status(500).send({ "Error": e })
  }
}

var getOrderProduct = async function (req, res) {
  const productOrderList = await ProductOrder.findAll({
    where:{
      order_id: req.body
    }
  })
  res.send({ data: productOrderList })
}

module.exports = {
  addProductOrder,
  getOrderProduct
}