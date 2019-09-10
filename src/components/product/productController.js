'use strict';

var Product = require('./productModel')

var listAllProduct = async function (req, res) {
  try {
    const productList = await Product.findAll({
      order: [["id", "ASC"]]
    })
    res.send({ data: productList })
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en listAllProduct" + e })
  }
}

var addProduct = async function (req, res) {
  var newProduct = req.body
  var productIdMax = await Product.sequelize.query("select max(id) from products")
  var newID = productIdMax[0][0].max + 1
  try {
    await Product.create({
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description,
      cuantity: newProduct.cuantity,
      id: newID
    })
    res.send({ message: 'created', product_id: newID })
  } catch (e) {
    return res.status(400).send({ Error: " Ha ocurrido un error en addProduct" + e })
  }
}

var deleteProduct = async function (req, res) {
  try {
    await Product.destroy({
      where: {
        id: req.body.id_product
      }
    })
    res.send({ message: 'Producto eliminado correctamente!' })
  } catch (e) {
    return res.status(400).send({ Error: 'Ha ocurrido un error en deleteProduct' + e })
  }
}

var updateProduct = async function (req, res) {
  const updatedProduct = req.body
  try {
    await Product.update({
      name: updatedProduct.name,
      price: updatedProduct.price,
      description: updatedProduct.description,
      cuantity: updatedProduct.cuantity
    }, {
        where: {
          id: updatedProduct.id_product
        }
      })
    return res.send({ status: 'ok', product: updatedProduct })
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en updateProduct", e })
  }
}

const decreaseCuantity = async function (req, res) {
  try {
    await Product.update({
      cuantity: updatedProduct.cuantity
    }, {
        where: {
          id: updatedProduct.id_product
        }
      })
  } catch (e) {
    return res.status(400).send({ Error: "Ha ocurrido un error en decreaseCuantity " + e })
  }
}

module.exports = {
  listAllProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  decreaseCuantity
}